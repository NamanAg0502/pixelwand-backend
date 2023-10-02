import { Router } from 'express';
const router = Router();
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/calender.controller.js';

// Create a new event
router.post('/', createEvent);

// Get events for a specific date range
router.get('/', getEvents);

// Update an event
router.put('/:eventId', updateEvent);

// Delete an event
router.delete('/:eventId', deleteEvent);

export default router;
