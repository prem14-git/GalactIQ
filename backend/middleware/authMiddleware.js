import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: 'Invalid token' });
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token not valid' });
  }
};

export default authMiddleware;
