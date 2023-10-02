// controllers/chatController.js

import ChatRoom from '../models/chat.room.model.js';
import Message from '../models/message.model.js';
import { validationResult } from 'express-validator';

// Create a new chat room
async function createChatRoom(req, res) {
  try {
    const { name, members } = req.body;
    const chatRoom = new ChatRoom({ name, members });
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Send a message in a chat room
async function sendMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { content, chatRoomId } = req.body;
    const sender = req.user.userId; // Assuming you have authentication middleware
    console.log(sender);
    const message = new Message({ content, sender, chatRoom: chatRoomId });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Get messages for a chat room
async function getChatRoomMessages(req, res) {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoom: chatRoomId }).populate(
      'sender'
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all chat rooms
async function getAllChatRooms(req, res) {
  try {
    const chatRooms = await ChatRoom.find();
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { createChatRoom, sendMessage, getChatRoomMessages, getAllChatRooms };
