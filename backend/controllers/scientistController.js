import Scientist from '../models/Scientist.js';

// GET /api/scientists?country=...&search=...
export const getScientists = async (req, res) => {
  try {
    const { country, search } = req.query;
    let filter = {};
    if (country) filter.country = country;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { contributions: { $regex: search, $options: 'i' } }
      ];
    }
    const scientists = await Scientist.find(filter);
    res.json(scientists);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/scientists
export const createScientist = async (req, res) => {
  try {
    const { name, country, photo, contributions } = req.body;
    const scientist = new Scientist({ name, country, photo, contributions });
    await scientist.save();
    res.status(201).json(scientist);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// PUT /api/scientists/:id
export const updateScientist = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Scientist.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Scientist not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE /api/scientists/:id
export const deleteScientist = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Scientist.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Scientist not found' });
    res.json({ message: 'Scientist deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const getScientistById = async (req, res) => {
  try {
    const scientist = await Scientist.findById(req.params.id);
    if (!scientist) return res.status(404).json({ error: 'Scientist not found' });
    res.json(scientist);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
