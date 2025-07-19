import { useEffect, useState } from 'react';
import axios from 'axios';
import ScientistForm from './ScientistForm';
import SearchBar from '../SearchBar';
import { toast } from 'react-toastify';

export default function ManageScientists() {
  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editScientist, setEditScientist] = useState(null);
  const [search, setSearch] = useState('');

  const fetchScientists = () => {
    setLoading(true);
    setError(null);
    axios.get(`/api/scientists?search=${encodeURIComponent(search)}`)
      .then(res => {
        setScientists(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load scientists.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchScientists();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    fetchScientists();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this scientist?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/scientists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Scientist deleted!');
      fetchScientists();
    } catch (err) {
      toast.error('Failed to delete scientist');
    }
  };

  const handleAdd = () => {
    setEditScientist(null);
    setShowForm(true);
  };

  const handleEdit = (scientist) => {
    setEditScientist(scientist);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    const token = localStorage.getItem('adminToken');
    try {
      if (editScientist) {
        // Edit mode
        await axios.put(`/api/scientists/${editScientist._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Scientist updated!');
      } else {
        // Add mode
        await axios.post('/api/scientists', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Scientist added!');
      }
      setShowForm(false);
      setEditScientist(null);
      fetchScientists();
    } catch (err) {
      toast.error('Failed to save scientist');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Scientists</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Search scientists..." />
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add Scientist
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <ScientistForm
            initial={editScientist}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditScientist(null); }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scientists.map(s => (
          <div key={s._id} className="bg-white rounded shadow p-4 flex flex-col">
            <img src={s.photo || '/default-scientist.png'} alt={s.name} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="text-gray-600">{s.country}</p>
            <p className="text-gray-700 text-sm mb-2">{s.contributions}</p>
            <div className="flex gap-2 mt-auto">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(s)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(s._id)}
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