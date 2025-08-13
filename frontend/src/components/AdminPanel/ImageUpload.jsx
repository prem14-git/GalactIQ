import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ImageUpload({ onUpload, initialUrl }) {
  const [imageUrl, setImageUrl] = useState(initialUrl || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setImageUrl(res.data.imageUrl);
      // Pass both URL and public_id to parent component
      onUpload(res.data.imageUrl, res.data.public_id);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Image upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded" />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="border p-2 rounded"
        disabled={uploading}
      />
      {uploading && <div className="text-blue-500 text-sm">Uploading...</div>}
    </div>
  );
} 