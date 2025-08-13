import News from '../models/News.js';
import { deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

// GET /api/news?search=...
export const getNews = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const news = await News.find(filter).sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/news
export const createNews = async (req, res) => {
  try {
    const { title, image, description, date, cloudinary_public_id } = req.body;
    const news = new News({ 
      title, 
      image, 
      description, 
      date,
      cloudinary_public_id 
    });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// PUT /api/news/:id
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { cloudinary_public_id: newPublicId } = req.body;
    
    // Get the current news to check if we need to delete old image
    const currentNews = await News.findById(id);
    if (!currentNews) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // If there's a new image and old image exists, delete the old one from Cloudinary
    if (newPublicId && currentNews.cloudinary_public_id && 
        newPublicId !== currentNews.cloudinary_public_id) {
      await deleteFromCloudinary(currentNews.cloudinary_public_id);
    }
    
    const updated = await News.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE /api/news/:id
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Delete image from Cloudinary if it exists
    if (news.cloudinary_public_id) {
      await deleteFromCloudinary(news.cloudinary_public_id);
    }
    
    await News.findByIdAndDelete(id);
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
};
