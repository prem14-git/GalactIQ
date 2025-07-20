import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  favorites: {
    scientists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scientist' }],
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }]
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User; 