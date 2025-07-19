import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';

export default function ManageComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parentType, setParentType] = useState('scientist');
  const [parentId, setParentId] = useState('');
  const [parents, setParents] = useState([]); // scientists or news
  const [search, setSearch] = useState('');

  // Fetch scientists or news for parent selection
  useEffect(() => {
    setParentId('');
    setParents([]);
    if (parentType === 'scientist') {
      axios.get('/api/scientists').then(res => setParents(res.data));
    } else {
      axios.get('/api/news').then(res => setParents(res.data));
    }
  }, [parentType]);

  // Fetch comments based on filters
  useEffect(() => {
    if (!parentId) {
      setComments([]);
      return;
    }
    setLoading(true);
    setError(null);
    axios.get(`/api/comments?parentType=${parentType}&parentId=${parentId}`)
      .then(res => {
        let filtered = res.data;
        if (search) {
          const q = search.toLowerCase();
          // Filter by author/content in any level of nesting
          const filterRecursive = (comments) => comments
            .filter(c => c.author.toLowerCase().includes(q) || c.content.toLowerCase().includes(q) || (c.replies && filterRecursive(c.replies).length > 0))
            .map(c => ({ ...c, replies: c.replies ? filterRecursive(c.replies) : [] }));
          filtered = filterRecursive(filtered);
        }
        setComments(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load comments.');
        setLoading(false);
      });
  }, [parentType, parentId, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment and its replies?')) return;
    const token = localStorage.getItem('adminToken');
    await axios.delete(`/api/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Refresh
    if (parentId) {
      const res = await axios.get(`/api/comments?parentType=${parentType}&parentId=${parentId}`);
      setComments(res.data);
    }
  };

  // Recursive render for nested comments
  function renderComments(comments, level = 0) {
    return comments.map(c => (
      <div key={c._id} className={`bg-white rounded shadow p-4 mb-2 ml-${level * 4}`}>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-blue-700">{c.author}</span>
            <span className="text-xs text-gray-400 ml-2">{new Date(c.createdAt).toLocaleString()}</span>
            <div className="text-gray-800 mt-1">{c.content}</div>
          </div>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => handleDelete(c._id)}
          >
            Delete
          </button>
        </div>
        {c.replies && c.replies.length > 0 && (
          <div className="ml-4 border-l pl-4 mt-2">
            {renderComments(c.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Comments</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Parent Type</label>
          <select
            className="border p-2 rounded w-full"
            value={parentType}
            onChange={e => setParentType(e.target.value)}
          >
            <option value="scientist">Scientist</option>
            <option value="news">News</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Select {parentType === 'scientist' ? 'Scientist' : 'News'}</label>
          <select
            className="border p-2 rounded w-full"
            value={parentId}
            onChange={e => setParentId(e.target.value)}
          >
            <option value="">-- Select --</option>
            {parents.map(p => (
              <option key={p._id} value={p._id}>
                {parentType === 'scientist' ? p.name : p.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by author or content..." />
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-2">
        {comments.length === 0 && !loading ? (
          <div className="text-gray-400">No comments found.</div>
        ) : (
          renderComments(comments)
        )}
      </div>
    </div>
  );
} 