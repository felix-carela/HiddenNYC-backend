import User from '../models/user.js';

export async function createUser(req, res) {
  const userProfile = req.body;
  console.log('User profile', userProfile)
  try {
      let user = await User.findOne({ googleId: userProfile.id });
      if (!user) {
          user = await User.create({
              userName: userProfile.name,
              googleId: userProfile.id,
          });
      }
      res.json({ message: 'Profile processed and saved!', user });
      console.log('User created!', user);
  } catch (err) {
      res.status(500).json({ message: 'Error processing the profile', error: err.message });
  }
};
