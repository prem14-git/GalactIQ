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
    console.log('Fetching favorites for user:', req.user.id);
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    console.log('Raw user favorites:', user.favorites);
    
    // Manually populate scientists and news
    let scientists = [];
    let news = [];
    
    if (user.favorites?.scientists?.length > 0) {
      scientists = await Scientist.find({ _id: { $in: user.favorites.scientists } });
      console.log('Found scientists:', scientists.length);
    }
    
    if (user.favorites?.news?.length > 0) {
      console.log('News IDs in favorites:', user.favorites.news);
      news = await News.find({ _id: { $in: user.favorites.news } });
      console.log('Found news items:', news.length);
      console.log('News items:', news.map(n => ({ id: n._id, title: n.title })));
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
    
    console.log(`Processing ${type} favorite for user ${req.user.id}`);
    console.log('Current user favorites:', user.favorites);
    
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
    console.log(`Array key: ${arrayKey}, Current favorites:`, currentFavorites);
    const itemIndex = currentFavorites.indexOf(itemId);
    
    console.log(`Current ${arrayKey}:`, currentFavorites);
    console.log(`Item ${itemId} index:`, itemIndex);
    
    if (itemIndex > -1) {
      // Remove from favorites
      currentFavorites.splice(itemIndex, 1);
      await user.save();
      console.log(`Removed ${type} ${itemId} from favorites`);
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      // Add to favorites
      currentFavorites.push(itemId);
      console.log(`Before save - favorites:`, user.favorites);
      console.log(`Before save - ${arrayKey}:`, user.favorites[arrayKey]);
      
      // Mark the favorites object as modified
      user.markModified('favorites');
      
      await user.save();
      
      console.log(`After save - favorites:`, user.favorites);
      console.log(`After save - ${arrayKey}:`, user.favorites[arrayKey]);
      
      console.log(`Added ${type} ${itemId} to favorites`);
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
    
    // Verify the save worked
    const verifyUser = await User.findById(req.user.id);
    console.log('Verification - final user favorites:', verifyUser.favorites);
    
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