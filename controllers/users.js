import User from '../models/user.js'
// import Event from '../models/event.js'

// export async function getUserById(req, res) {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

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
