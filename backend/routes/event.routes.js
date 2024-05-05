import express from "express";
import { addEvent,getAllEvents,updateEvent,deleteEvent,getEventById } from "../controllers/events.controllers.js";

const router = express.Router();

router.post("/addEvent", addEvent);
router.get('/', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a event by ID
router.put('/updateEvent/:id', updateEvent); // Update a event by ID
router.delete('/deleteEvent/:id', deleteEvent); // Delete a event by ID

export default router;