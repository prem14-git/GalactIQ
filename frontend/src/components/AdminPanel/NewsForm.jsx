import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function NewsForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [date, setDate] = useState(initial?.date ? initial.date.slice(0, 10) : '');
  const [description, setDescription] = useState(initial?.description || '');
  const [image, setImage] = useState(initial?.image || '');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(initial?.cloudinary_public_id || '');
  const [saving, setSaving] = useState(false);

  const handleImageUpload = (imageUrl, publicId) => {
    setImage(imageUrl);
    setCloudinaryPublicId(publicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ 
      title, 
      date, 
      description, 
      image,
      cloudinary_public_id: cloudinaryPublicId 
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-50 rounded shadow">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          className="border p-2 rounded w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Date</label>
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className="border p-2 rounded w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Image</label>
        <ImageUpload onUpload={handleImageUpload} initialUrl={image} />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 