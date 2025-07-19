import express from 'express';
import {
  addComment,
  getComments,
  likeComment,
  deleteComment
} from '../controllers/commentController.js';
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // Uncomment for admin delete

const router = express.Router();

// Add a comment (user only)
router.post('/', userAuthMiddleware, addComment);
// Get comments for a scientist or news
router.get('/', getComments);
// Like/unlike a comment (user only)
router.post('/:id/like', userAuthMiddleware, likeComment);
// Delete a comment (admin only)
router.delete('/:id', /*authMiddleware,*/ deleteComment);

export default router; 