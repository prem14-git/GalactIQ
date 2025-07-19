import express from 'express';
import multer from 'multer';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST /api/upload (admin only)
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return the file path (relative)
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router; 