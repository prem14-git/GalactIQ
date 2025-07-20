import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminCountryScientists({ countryOverride }) {
  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const country = countryOverride || 'USA';

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/scientists?country=${encodeURIComponent(country)}&search=${encodeURIComponent(search)}`)
      .then(res => {
        setScientists(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load scientists.');
        setLoading(false);
      });
  }, [country, search]);

  if (loading) {
    return <div className="text-gray-500">Loading scientists...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scientists..."
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scientists.map(scientist => (
          <div key={scientist._id} className="bg-white rounded shadow p-4">
            <img 
              src={scientist.photo || '/default-scientist.png'} 
              alt={scientist.name} 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <h3 className="text-lg font-semibold">{scientist.name}</h3>
            <p className="text-gray-600">{scientist.country}</p>
            <p className="text-gray-700 text-sm mb-2">{scientist.contributions}</p>
            <Link
              to={`/scientist/${scientist._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              View Profile (New Window)
            </Link>
          </div>
        ))}
      </div>
      
      {scientists.length === 0 && (
        <div className="text-gray-400 text-center py-8">No scientists found.</div>
      )}
    </div>
  );
} 