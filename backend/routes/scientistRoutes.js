import express from 'express';
import {
  getScientists,
  createScientist,
  updateScientist,
  deleteScientist,
  getScientistById
} from '../controllers/scientistController.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // Uncomment when auth is ready

const router = express.Router();

// Public route
router.get('/', getScientists);
router.get('/:id', getScientistById);
// Admin routes (add authMiddleware when ready)
router.post('/', /*authMiddleware,*/ createScientist);
router.put('/:id', /*authMiddleware,*/ updateScientist);
router.delete('/:id', /*authMiddleware,*/ deleteScientist);

export default router;
