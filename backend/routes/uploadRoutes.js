import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

const router = express.Router();

// Set up multer to store files in memory (for Cloudinary upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// POST /api/upload (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file, 'galactiq');
    
    res.json({ 
      imageUrl: result.url,
      public_id: result.public_id 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default router; 