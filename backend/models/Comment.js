import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String }], // user IDs or anonymous session IDs
  parentType: { type: String, enum: ['scientist', 'news'], required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'parentType' },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment; 