import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminNewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/news?search=${encodeURIComponent(search)}`)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, [search]);

  if (loading) {
    return <div className="text-gray-500">Loading news...</div>;
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
          placeholder="Search news..."
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map(article => (
          <div key={article._id} className="bg-white rounded shadow p-4">
            <img 
              src={article.image || '/default-news.png'} 
              alt={article.title} 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
            <p className="text-gray-700 text-sm mb-2">{article.description}</p>
            <Link
              to={`/news/${article._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Read Article (New Window)
            </Link>
          </div>
        ))}
      </div>
      
      {news.length === 0 && (
        <div className="text-gray-400 text-center py-8">No news found.</div>
      )}
    </div>
  );
} 