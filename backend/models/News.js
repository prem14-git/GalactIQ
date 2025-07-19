import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String }, // URL to image
  description: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const News = mongoose.model('News', NewsSchema);
export default News;
