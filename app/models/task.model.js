// src/models/Task.js
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  description: String,
  priority: String,
  deadline: Date,
  status: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export default model('Task', taskSchema);
