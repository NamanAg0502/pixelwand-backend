import { Router } from 'express';
import { body } from 'express-validator';
const router = Router();
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

// User registration route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  register
);

// User login route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.post('/logout', logout);

// router.use(authenticate);

// Protected admin route
router.get('/admin', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json({ message: 'Admin route accessed successfully' });
});

// Protected user route
router.get('/user', (req, res) => {
  // Accessible to both users and admins
  res.json({ message: 'User route accessed successfully' });
});

router.get('/user/:userId', getUser);

export default router;
