import express from 'express';
import QuizQuestion from '../models/QuizQuestion.js';

const router = express.Router();

// GET /api/quiz/random?count=5 - Get N random quiz questions
router.get('/random', async (req, res) => {
  const count = parseInt(req.query.count) || 5;
  try {
    const total = await QuizQuestion.countDocuments();
    const random = await QuizQuestion.aggregate([{ $sample: { size: Math.min(count, total) } }]);
    res.json(random);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz questions.' });
  }
});

export default router; 