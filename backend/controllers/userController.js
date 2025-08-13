import User from '../models/User.js';
import Scientist from '../models/Scientist.js';
import News from '../models/News.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// POST /api/users/signup
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ error: 'Username or email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/users/favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Manually populate scientists and news
    let scientists = [];
    let news = [];
    
    if (user.favorites?.scientists?.length > 0) {
      scientists = await Scientist.find({ _id: { $in: user.favorites.scientists } });
    }
    
    if (user.favorites?.news?.length > 0) {
      news = await News.find({ _id: { $in: user.favorites.news } });
    }
    
    res.json({
      scientists: scientists,
      news: news
    });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// POST /api/users/favorites
export const toggleFavorite = async (req, res) => {
  try {
    const { type, itemId } = req.body; // type: 'scientist' or 'news'
    
    // First, check if the item exists in the user's favorites
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const arrayKey = type === 'scientist' ? 'scientists' : 'news';
    
    // Initialize favorites object if it doesn't exist
    if (!user.favorites) {
      user.favorites = { scientists: [], news: [] };
    }
    
    // Initialize the specific array if it doesn't exist
    if (!user.favorites[arrayKey]) {
      user.favorites[arrayKey] = [];
    }
    
    const currentFavorites = user.favorites[arrayKey];
    const itemIndex = currentFavorites.indexOf(itemId);
    
    if (itemIndex > -1) {
      // Remove from favorites
      currentFavorites.splice(itemIndex, 1);
      await user.save();
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      // Add to favorites
      currentFavorites.push(itemId);
      
      // Mark the favorites object as modified
      user.markModified('favorites');
      await user.save();
      
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
    
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 