// routes/chatRoutes.js

import { Router } from 'express';
import { body } from 'express-validator';
import {
  createChatRoom,
  sendMessage,
  getChatRoomMessages,
  getAllChatRooms,
} from '../controllers/chat.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Create a new chat room
router.post(
  '/create-room',
  authenticate,
  [
    body('name').notEmpty().withMessage('Chat room name is required'),
    body('members').isArray().withMessage('Members must be an array'),
  ],
  createChatRoom
);

// Send a message in a chat room
router.post(
  '/send-message',
  authenticate,
  [
    body('content').notEmpty().withMessage('Message content is required'),
    body('chatRoomId').notEmpty().withMessage('Chat room ID is required'),
  ],
  sendMessage
);

// Get messages for a chat room
router.get('/messages/:chatRoomId', authenticate, getChatRoomMessages);

router.get('/rooms', authenticate, getAllChatRooms);

export default router;
