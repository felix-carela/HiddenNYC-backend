import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db/connection.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import eventsRouter from './routes/events.js';
import usersRouter from './routes/users.js';
import User from './models/user.js';  // import the User model
import session from 'express-session';


const PORT = process.env.PORT;

const app = express();

// Passport setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,  // Adjusted to match second snippet
  callbackURL: process.env.GOOGLE_CALLBACK  // Adjusted to match second snippet
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) return done(null, user);
    
    user = await User.create({
      name: profile.displayName,
      googleId: profile.id,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  done(null, await User.findById(userId));
});
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to 'true' if you're using HTTPS
}));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());  // If you want to use sessions

app.use('/api/event/', eventsRouter);
app.use('/api/user/', usersRouter);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.post('/api/google-profile', async (req, res) => {
  const userProfile = req.body;
  console.log('User profile', userProfile)
  try {
      let user = await User.findOne({ googleId: userProfile.id });
      if (!user) {
          user = await User.create({
              userName: userProfile.displayName,
              googleId: userProfile.id,
              // email: userProfile.emails[0].value,
              // avatar: userProfile.photos[0].value
          });
      }
      // Return a success response to the frontend
      res.json({ message: 'Profile processed and saved!', user });
      console.log('User created!', user);
  } catch (err) {
      // Return an error response to the frontend
      res.status(500).json({ message: 'Error processing the profile', error: err.message });
  }
});

// 
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // res.redirect('/some-frontend-route');
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
