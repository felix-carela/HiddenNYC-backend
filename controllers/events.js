import User from '../models/user.js';
import Event from '../models/event.js';

export async function getEvents(req, res) {
}

export async function createEvent(req, res) {
  try {
    const { userId, address, category } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newEvent = new Event({
      author: user.username,
      address,
      category,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteEvent(req, res) {
}
