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
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: 'Event id is required' });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
export async function updateEvent(req, res) {
  try {
    const { id } = req.params; // assuming you are passing the id of the event in the request parameters
    if (!id) {
      return res.status(400).json({ message: 'Event id is required' });
    }

    const { address, category } = req.body; // assuming you want to update address and category of the event
    if (!address || !category) {
      return res.status(400).json({ message: 'Address and category are required' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, { address, category }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}



