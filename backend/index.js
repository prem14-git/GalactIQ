import dotenv from 'dotenv';

// Load environment variables FIRST, before any other imports
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import scientistRoutes from './routes/scientistRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import spaceFactsRoutes from './routes/spaceFactsRoutes.js';
import QuizQuestion from './models/QuizQuestion.js';
import quizRoutes from './routes/quizRoutes.js';

const app = express();

// CORS (Express 5 safe)
const frontendOrigin = process.env.FRONTEND_ORIGIN;
app.use(cors({
	origin: frontendOrigin ? frontendOrigin : true, // reflect request origin in dev
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: Boolean(frontendOrigin), // only enable credentials if locked origin is provided
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving removed - using Cloudinary for image storage

// API routes
app.use('/api/scientists', scientistRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/space-facts', spaceFactsRoutes);
app.use('/api/quiz', quizRoutes);

// Temporary endpoint to seed quiz questions
app.post('/api/quiz/seed', async (req, res) => {
  try {
    await QuizQuestion.seedSampleQuestions();
    res.status(200).json({ message: 'Sample quiz questions seeded!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed quiz questions.' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log('MongoDB connected ✅');
}).catch((err) => {
	console.error('MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});