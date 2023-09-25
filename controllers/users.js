import User from '../models/user.js'
import Event from '../models/event.js'

export async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      // If the user is not found, send a 404 (Not Found) response
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, send a JSON response with the user data
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function createUser(req, res) {
  try {
    const { username, googleId } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      googleId,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a JSON response with the saved user data
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
