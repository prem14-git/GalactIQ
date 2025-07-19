import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ManageScientists from '../components/AdminPanel/ManageScientists';
import ManageNews from '../components/AdminPanel/ManageNews';
import ManageComments from '../components/AdminPanel/ManageComments';
import Analytics from '../components/AdminPanel/Analytics';
import CountryScientists from './CountryScientists';
import NewsList from './NewsList';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'scientists', label: 'Manage Scientists' },
  { key: 'news', label: 'Manage News' },
  { key: 'comments', label: 'Manage Comments' },
  { key: 'browse_scientists', label: 'Browse Scientists' },
  { key: 'browse_news', label: 'Browse News' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [browseCountry, setBrowseCountry] = useState('USA'); // Default country for browse

  useEffect(() => {
    // Redirect to login if not authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast.success('Admin logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Logo size="large" linkToHome={false} />
            <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded font-semibold transition focus:outline-none ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white shadow'
                  : 'bg-gray-100 text-blue-800 hover:bg-blue-100'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 'dashboard' && (
            <div className="text-gray-700">Welcome, admin! Select a tab above to manage or preview content.</div>
          )}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'scientists' && <ManageScientists />}
          {activeTab === 'news' && <ManageNews />}
          {activeTab === 'comments' && <ManageComments />}
          {activeTab === 'browse_scientists' && (
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Select Country</label>
                <select
                  className="border p-2 rounded"
                  value={browseCountry}
                  onChange={e => setBrowseCountry(e.target.value)}
                >
                  {['USA', 'Russia', 'China', 'India', 'UK', 'France', 'Germany', 'Japan', 'Canada', 'Italy'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <CountryScientists key={browseCountry} countryOverride={browseCountry} />
            </div>
          )}
          {activeTab === 'browse_news' && <NewsList />}
        </div>
      </div>
    </div>
  );
} 