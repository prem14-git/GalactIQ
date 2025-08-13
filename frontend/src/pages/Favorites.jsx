import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarButton from '../components/StarButton';
import { toast } from 'react-toastify';

export default function Favorites() {
  const [favorites, setFavorites] = useState({ scientists: [], news: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scientists');

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Refresh favorites when page comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchFavorites();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please login to view favorites');
      return;
    }

    try {
      const response = await axios.get('/api/users/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log('Favorites response:', response.data);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (type, itemId, isFavorite) => {
    if (!isFavorite) {
      // Item was removed from favorites, update local state
      setFavorites(prev => ({
        ...prev,
        [type]: (prev[type] || []).filter(item => item._id !== itemId)
      }));
    } else {
      // Item was added to favorites, refresh the entire list
      fetchFavorites();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative mb-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white/70 text-lg animate-pulse">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black">
      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            ⭐ My Favorites
          </h1>
          <p className="text-xl text-white/70 mb-6 max-w-2xl mx-auto">
            Your personal collection of amazing scientists and fascinating space news
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <button
              onClick={() => setActiveTab('scientists')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'scientists'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🧬 Scientists ({favorites.scientists.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              📰 News ({favorites.news.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Scientists Tab */}
          {activeTab === 'scientists' && (
            <div>
              {favorites.scientists.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-white/40 text-6xl mb-4">🌟</div>
                  <p className="text-white/60 text-xl mb-2">No favorite scientists yet</p>
                  <p className="text-white/40">Start exploring and add some amazing scientists to your collection!</p>
                  <Link
                    to="/home"
                    className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Scientists
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favorites.scientists.map((scientist, index) => (
                    <div
                      key={scientist._id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <img
                          src={scientist.photo || '/default-scientist.png'}
                          alt={scientist.name}
                          className="w-full h-48 object-cover rounded-2xl mb-4"
                        />
                        <div className="absolute top-2 right-2">
                          <StarButton
                            type="scientist"
                            itemId={scientist._id}
                            initialFavorited={true}
                            size="medium"
                            onToggle={handleToggleFavorite}
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{scientist.name}</h3>
                      <p className="text-blue-300 font-medium mb-3">🌍 {scientist.country}</p>
                      <p className="text-gray-300 text-sm line-clamp-3 mb-4">{scientist.contributions}</p>
                      <Link
                        to={`/scientist/${scientist._id}`}
                        className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div>
              {favorites.news.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-white/40 text-6xl mb-4">📰</div>
                  <p className="text-white/60 text-xl mb-2">No favorite news yet</p>
                  <p className="text-white/40">Discover exciting space news and save them for later reading!</p>
                  <Link
                    to="/news"
                    className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Browse News
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {favorites.news.map((article, index) => (
                    <div
                      key={article._id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <img
                          src={article.image || '/default-news.png'}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <StarButton
                            type="news"
                            itemId={article._id}
                            initialFavorited={true}
                            size="medium"
                            onToggle={handleToggleFavorite}
                          />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                        <p className="text-white/70 text-sm line-clamp-3 mb-4">{article.description}</p>
                        <Link
                          to={`/news/${article._id}`}
                          className="inline-block w-full text-center bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/home"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Home Base
          </Link>
        </div>
      </div>
    </div>
  );
} 