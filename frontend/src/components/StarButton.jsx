import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function StarButton({ type, itemId, initialFavorited = false, size = 'medium', onToggle }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (!localStorage.getItem('userToken')) {
      toast.error('Please login to add favorites');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      console.log('Sending favorite request:', { type, itemId });
      
      const response = await axios.post('/api/users/favorites', 
        { type, itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('Favorite response:', response.data);
      setIsFavorite(response.data.isFavorite);
      toast.success(response.data.message);
      
      // Call the onToggle callback if provided
      if (onToggle) {
        onToggle(type, itemId, response.data.isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      console.error('Error details:', error.response?.data);
      toast.error('Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`group transition-all duration-300 hover:scale-110 focus:outline-none ${
        loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${sizeClasses[size]} transition-all duration-300 ${
          isFavorite 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400 hover:text-yellow-400 group-hover:scale-110'
        }`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
  );
} 