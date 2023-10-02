import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Create a new project
router.post('/', authenticate, createProject);

// Get a list of all projects
router.get('/', authenticate, getProjects);

// Get details of a specific project by ID
router.get('/:id', authenticate, getProjectById);

// Update project details by ID
router.put('/:id', authenticate, updateProject);

// Delete a project by ID
router.delete('/:id', authenticate, deleteProject);

export default router;
