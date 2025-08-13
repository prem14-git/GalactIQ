import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String }, // URL to image
  cloudinary_public_id: { type: String }, // Cloudinary public_id for deletion
  description: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const News = mongoose.model('News', NewsSchema);
export default News;
