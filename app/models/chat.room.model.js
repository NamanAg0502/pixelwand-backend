// models/ChatRoom.js

import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
});

const ChatRoom = model('ChatRoom', chatRoomSchema);

export default ChatRoom;
