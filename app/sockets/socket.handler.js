// sockets/socketHandler.js

import ChatRoom from '../models/chat.room.model.js';
import Message from '../models/message.model.js';
import { validationResult } from 'express-validator';

function socketHandler(socket, io) {
  // When a user connects to a chat room
  socket.on('joinRoom', async ({ chatRoomId }) => {
    try {
      const chatRoom = await ChatRoom.findById(chatRoomId);
      if (!chatRoom) {
        socket.emit('error', { message: 'Chat room not found' });
        return;
      }
      socket.join(chatRoomId); // Join the room associated with the chat room ID
      io.to(chatRoomId).emit('userJoined', { userId: socket.id }); // Broadcast user joined event
    } catch (error) {
      console.error(error);
    }
  });

  // When a user sends a message
  socket.on('sendMessage', async ({ chatRoomId, content }) => {
    const errors = validationResult({ content, chatRoomId });
    if (!errors.isEmpty()) {
      socket.emit('error', { message: 'Invalid message data' });
      return;
    }

    try {
      const sender = socket.id; // You may have user authentication to identify the sender
      const message = new Message({ content, sender, chatRoom: chatRoomId });
      await message.save();
      io.to(chatRoomId).emit('messageReceived', message); // Broadcast the received message to all room members
    } catch (error) {
      console.error(error);
    }
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    io.emit('userDisconnected', { userId: socket.id }); // Broadcast user disconnected event
  });
}

export default socketHandler;
