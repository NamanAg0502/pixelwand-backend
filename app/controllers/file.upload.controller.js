// controllers/fileController.js
import multer, { memoryStorage } from 'multer';
import File from '../models/file.model.js';

const storage = memoryStorage();
const upload = multer({ storage: storage });

// Middleware function for file upload
const handleFileUpload = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileData = new File({
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    buffer: req.file.buffer,
  });

  try {
    await fileData.save();
    res
      .status(201)
      .json({ message: 'File uploaded successfully', file: fileData });
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const uploadFileMiddleware = [upload.single('file'), handleFileUpload];
