import express from 'express';
import { signupUser, loginUser, getFavorites, toggleFavorite } from '../controllers/userController.js';
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

// Favorites routes (require authentication)
router.get('/favorites', userAuthMiddleware, getFavorites);
router.post('/favorites', userAuthMiddleware, toggleFavorite);

export default router; 