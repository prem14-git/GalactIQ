import { useState } from 'react';
import ImageUpload from './ImageUpload';

const COUNTRIES = [
  'USA', 'Russia', 'China', 'India', 'UK', 'France', 'Germany', 'Japan', 'Canada', 'Italy'
];

export default function ScientistForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || '');
  const [country, setCountry] = useState(initial?.country || COUNTRIES[0]);
  const [contributions, setContributions] = useState(initial?.contributions || '');
  const [photo, setPhoto] = useState(initial?.photo || '');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(initial?.cloudinary_public_id || '');
  const [saving, setSaving] = useState(false);

  const handlePhotoUpload = (imageUrl, publicId) => {
    setPhoto(imageUrl);
    setCloudinaryPublicId(publicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ 
      name, 
      country, 
      contributions, 
      photo,
      cloudinary_public_id: cloudinaryPublicId 
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-50 rounded shadow">
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          className="border p-2 rounded w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Country</label>
        <select
          className="border p-2 rounded w-full"
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Contributions</label>
        <textarea
          className="border p-2 rounded w-full"
          value={contributions}
          onChange={e => setContributions(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Photo</label>
        <ImageUpload onUpload={handlePhotoUpload} initialUrl={photo} />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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