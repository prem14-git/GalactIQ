import News from '../models/News.js';

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
    const { title, image, description, date } = req.body;
    const news = new News({ title, image, description, date });
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
    const updated = await News.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'News not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE /api/news/:id
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
};
