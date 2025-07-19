import express from 'express';
import {
  getNews,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // Uncomment when auth is ready

const router = express.Router();

// Public route
router.get('/', getNews);

// Admin routes (add authMiddleware when ready)
router.post('/', /*authMiddleware,*/ createNews);
router.put('/:id', /*authMiddleware,*/ updateNews);
router.delete('/:id', /*authMiddleware,*/ deleteNews);

export default router;
