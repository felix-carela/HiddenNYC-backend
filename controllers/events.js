import User from '../models/user.js'
import Event from '../models/event.js'

export async function getEventById(req, res) {
  try {
    const eventId = req.params.id;

    // Find the event by ID in the database
    const event = await Event.findById(eventId);

    if (!event) {
      // If the event is not found, send a 404 (Not Found) response
      return res.status(404).json({ message: 'Event not found' });
    }

    // If the event is found, send a JSON response with the event data
    res.status(200).json(event);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getEvents(req, res) {
  try {
    // Find all events in the database
    const events = await Event.find();

    // Send a JSON response with the list of events
    res.status(200).json(events);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export async function createEvent(req, res) {
  try {
    const { userId, address, category } = req.body;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      // If the user is not found, send a 404 (Not Found) response
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new event instance and set the author to the user's username
    const newEvent = new Event({
      author: user.username, // Assuming 'username' is the user's username field
      address,
      category,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Send a JSON response with the saved event data
    res.status(201).json(savedEvent);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
