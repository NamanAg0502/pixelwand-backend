import Event from '../models/event.model.js'; // Create a Mongoose Event model

// Create a new event
export async function createEvent(req, res) {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
}

// Get events for a specific date range
export async function getEvents(req, res) {
  try {
    const { startDate, endDate } = req.query;
    const events = await Event.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
}

// Update an event
export async function updateEvent(req, res) {
  try {
    const { eventId } = req.params;
    const eventData = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
}

// Delete an event
export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.params;
    await Event.findByIdAndDelete(eventId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
}
