import mongoose from 'mongoose';

const ScientistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  photo: { type: String }, // URL to image
  cloudinary_public_id: { type: String }, // Cloudinary public_id for deletion
  contributions: { type: String, required: true }
}, { timestamps: true });

const Scientist = mongoose.model('Scientist', ScientistSchema);
export default Scientist;
