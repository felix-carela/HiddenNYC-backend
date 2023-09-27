import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db/connection.js';
import passport from 'passport';
import session from 'express-session';
import commentsRouter from './routes/comments.js';
import eventsRouter from './routes/events.js';
import usersRouter from './routes/users.js';

const PORT = process.env.PORT;
const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/comment/', commentsRouter);
app.use('/api/event/', eventsRouter);
app.use('/api/user/', usersRouter);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
