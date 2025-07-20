import express from 'express';
import { getRandomSpaceFact, getTodaySpaceFact } from '../controllers/spaceFactsController.js';

const router = express.Router();

// Get random space fact from NASA APOD
router.get('/random', getRandomSpaceFact);

// Get today's space fact from NASA APOD
router.get('/today', getTodaySpaceFact);

export default router; 