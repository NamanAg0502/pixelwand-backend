// models/File.js
import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
  originalname: String,
  mimetype: String,
  size: Number,
  buffer: Buffer,
});

const File = model('File', fileSchema);

export default File;
