import Comment from '../models/Comment.js';

// POST /api/comments (user only)
export const addComment = async (req, res) => {
  try {
    const { content, parentType, parentId, parentComment } = req.body;
    const author = req.user.username;
    const comment = new Comment({ content, author, parentType, parentId, parentComment: parentComment || null });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Helper to nest replies
const nestReplies = (comments) => {
  const commentMap = {};
  comments.forEach(c => commentMap[c._id] = { ...c._doc, replies: [] });
  const roots = [];
  comments.forEach(c => {
    if (c.parentComment) {
      commentMap[c.parentComment]?.replies.push(commentMap[c._id]);
    } else {
      roots.push(commentMap[c._id]);
    }
  });
  return roots;
};

// GET /api/comments?parentType=scientist&parentId=...
export const getComments = async (req, res) => {
  try {
    const { parentType, parentId } = req.query;
    if (!parentType || !parentId) return res.status(400).json({ error: 'Missing parentType or parentId' });
    // Fetch all comments for this parent (including replies)
    const comments = await Comment.find({ parentType, parentId }).sort({ createdAt: 1 });
    // Nest replies
    const nested = nestReplies(comments);
    res.json(nested);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/comments/:id/like (user only)
export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    const index = comment.likes.indexOf(userId);
    if (index === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(index, 1); // Unlike
    }
    await comment.save();
    res.json({ likes: comment.likes.length });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

// DELETE /api/comments/:id (admin only)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}; 