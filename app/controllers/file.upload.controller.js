import multer, { memoryStorage } from 'multer';
const storage = memoryStorage();
const upload = multer({ storage: storage });
const uploadedFiles = []; // In-memory storage (replace with database)

// Controller for file upload routes
const uploadFile = upload.single('file');
const handleFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileData = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    buffer: req.file.buffer,
  };
  uploadedFiles.push(fileData);

  res
    .status(201)
    .json({ message: 'File uploaded successfully', file: fileData });
};

// Controller for getting all uploaded files
const getAllFiles = (req, res, next) => {
  res.json({ files: uploadedFiles });
};

// Controller for getting a specific uploaded file
const getFile = (req, res, next) => {
  const fileId = req.params.fileId;
  const fileData = uploadedFiles.find((file) => file.id === fileId);

  if (!fileData) {
    return res.status(404).json({ error: 'File not found.' });
  }

  res.json({ file: fileData });
};

// Controller for deleting a specific uploaded file
const deleteFile = (req, res, next) => {
  const fileId = req.params.fileId;
  const index = uploadedFiles.findIndex((file) => file.id === fileId);

  if (index === -1) {
    return res.status(404).json({ error: 'File not found.' });
  }

  uploadedFiles.splice(index, 1);
  res.json({ message: 'File deleted successfully' });
};

export default {
  uploadFile: [uploadFile, handleFileUpload],
  getAllFiles,
  getFile,
  deleteFile,
};
