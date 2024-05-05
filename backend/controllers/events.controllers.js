import Events from "../models/events.model.js";


//generate event Id
const generateEventId = async () => {
  // Get the last event, sorted by _id in descending order
  const lastEventDetails = await Events.find().sort({ _id: -1 }).limit(1);

  // Check if there are any events
  if (lastEventDetails.length === 0) {
    return "EVENT-1"; // Return the first event ID if no events are found
  }

  // Extract the numeric part of the last event's eventID and increment it
  const lastId = lastEventDetails[0].eventId; 
  const lastNumber = parseInt(lastId.split("-")[1]);
  const newIdNumber = lastNumber + 1;

  // Return the new event ID
  return `EVENT-${newIdNumber}`;
};
export const addEvent = async (req, res) => {
  try {
    const eventID = await generateEventId();
    const newEvent = new Events({
      eventId: eventID,
      eventTitle: req.body.eventTitle,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      
    });
    const savedEvent = await newEvent.save();
    console.log(newEvent);
    res.status(201).json(savedEvent);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "failed to add event" });
  }
};
// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json(events);
    console.log(events);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to View events" });
  }
};
// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to retrieve event" });
  }
};

// Update a event by ID
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to update event" });
  }
};

// Delete a event by ID
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Events.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to delete Event" });
  }
};
