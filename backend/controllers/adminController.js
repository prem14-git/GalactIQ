import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Scientist from '../models/Scientist.js';
import News from '../models/News.js';
import Comment from '../models/Comment.js';
import mongoose from 'mongoose';

// POST /api/admin/login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Analytics endpoints
export const getAnalytics = async (req, res) => {
  try {
    // Get scientists by country
    const scientistsByCountry = await Scientist.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get news by month (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const newsByMonth = await News.aggregate([
      {
        $match: {
          date: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get scientists added by month (last 12 months)
    const scientistsByMonth = await Scientist.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get total counts
    const totalScientists = await Scientist.countDocuments();
    const totalNews = await News.countDocuments();
    const totalComments = await Comment.countDocuments();

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentNews = await News.countDocuments({ date: { $gte: sevenDaysAgo } });
    const recentComments = await Comment.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    res.json({
      scientistsByCountry,
      newsByMonth,
      scientistsByMonth,
      summary: {
        totalScientists,
        totalNews,
        totalComments,
        recentNews,
        recentComments
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};
