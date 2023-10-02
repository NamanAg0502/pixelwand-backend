// src/models/Project.js
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: String,
  description: String,
  startDate: String,
});

export default model('Project', projectSchema);
