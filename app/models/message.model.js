// models/Message.js

import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Message = model('Message', messageSchema);

export default Message;
