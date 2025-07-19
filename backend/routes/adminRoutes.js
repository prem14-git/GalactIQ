import express from 'express';
import { loginAdmin, getAnalytics } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/analytics', authMiddleware, getAnalytics);

export default router;
