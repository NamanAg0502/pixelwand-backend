import { Router } from 'express';
const router = Router();
import {
  uploadFile,
  getAllFiles,
  getFile,
  deleteFile,
} from '../controllers/fileUploadController';

// Define API routes for file uploads
router.post('/upload', uploadFile);
router.get('/', getAllFiles);
router.get('/:fileId', getFile);
router.delete('/:fileId', deleteFile);

export default router;
