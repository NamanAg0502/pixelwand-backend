import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Create a new task within a project
router.post('/tasks', authenticate, createTask);

// Get a list of all tasks within a project
router.get('/tasks', authenticate, getTasks);

// Get details of a specific task by ID
router.get('/tasks/:id', authenticate, getTaskById);

// Update task details by ID
router.put('/tasks/:id', authenticate, updateTask);

// Delete a task by ID
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;
