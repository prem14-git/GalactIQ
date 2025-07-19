import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsForm from './NewsForm';
import SearchBar from '../SearchBar';
import { toast } from 'react-toastify';

export default function ManageNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [search, setSearch] = useState('');

  const fetchNews = () => {
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
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news article?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('News deleted!');
      fetchNews();
    } catch (err) {
      toast.error('Failed to delete news');
    }
  };

  const handleAdd = () => {
    setEditNews(null);
    setShowForm(true);
  };

  const handleEdit = (newsItem) => {
    setEditNews(newsItem);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    const token = localStorage.getItem('adminToken');
    try {
      if (editNews) {
        // Edit mode
        await axios.put(`/api/news/${editNews._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('News updated!');
      } else {
        // Add mode
        await axios.post('/api/news', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('News added!');
      }
      setShowForm(false);
      setEditNews(null);
      fetchNews();
    } catch (err) {
      toast.error('Failed to save news');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage News</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Search news..." />
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add News
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <NewsForm
            initial={editNews}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditNews(null); }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map(n => (
          <div key={n._id} className="bg-white rounded shadow p-4 flex flex-col">
            <img src={n.image || '/default-news.png'} alt={n.title} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{n.title}</h3>
            <p className="text-gray-600">{new Date(n.date).toLocaleDateString()}</p>
            <p className="text-gray-700 text-sm mb-2">{n.description}</p>
            <div className="flex gap-2 mt-auto">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(n)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(n._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 