// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';

// export default function NewsList() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios.get(`/api/news?search=${encodeURIComponent(search)}`)
//       .then(res => {
//         setNews(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Failed to load news.');
//         setLoading(false);
//       });
//   }, [search]);

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6 text-green-800">Space News</h1>
//       <SearchBar value={search} onChange={setSearch} placeholder="Search news..." />
//       {loading && <div className="text-gray-500">Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {news.map(article => (
//           <Link
//             to={`/news/${article._id}`}
//             key={article._id}
//             className="block bg-white rounded shadow p-4 hover:shadow-lg transition"
//           >
//             <img
//               src={article.image || '/default-news.png'}
//               alt={article.title}
//               className="w-full h-48 object-cover rounded mb-2"
//             />
//             <h2 className="text-xl font-semibold text-green-700">{article.title}</h2>
//             <p className="text-gray-600 mb-1">{new Date(article.date).toLocaleDateString()}</p>
//             <p className="text-gray-700 text-sm line-clamp-3">{article.description}</p>
//           </Link>
//         ))}
//       </div>
//       <div className="mt-8">
//         <Link to="/home" className="text-green-500 hover:underline">&larr; Back to Home</Link>
//       </div>
//     </div>
//   );
// } 


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarButton from '../components/StarButton';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 focus-within:opacity-20 transition-opacity duration-300 -z-10"></div>
    </div>
  );
}

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/news?search=${encodeURIComponent(search)}`)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load cosmic news transmissions.');
        setLoading(false);
      });
  }, [search]);

  // Generate random stars
  const generateStars = () => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
  };

  const stars = generateStars();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Custom Styles */}
      <style>{`
        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #1e1b4b, #581c87);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
          border: 2px solid #1e1b4b;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 #1e1b4b;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black relative overflow-hidden">
        {/* Animated Background Stars */}
        <div className="absolute inset-0">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto py-12 px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
              🚀 Space News Hub
            </h1>
            <p className="text-xl text-white/70 mb-6 max-w-2xl mx-auto">
              Discover the latest cosmic discoveries, space missions, and astronomical wonders from across the universe
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <SearchBar 
              value={search} 
              onChange={setSearch} 
              placeholder="Search the cosmic archives..." 
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block relative mb-4">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <p className="text-white/70 text-lg animate-pulse">Scanning the cosmic frequencies...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 text-center mb-8">
              <div className="text-red-300 text-4xl mb-3">⚠️</div>
              <p className="text-red-200 font-semibold mb-2">Transmission Error</p>
              <p className="text-red-100/80">{error}</p>
            </div>
          )}

          {/* News Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {news.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-white/40 text-6xl mb-4">🌌</div>
                  <p className="text-white/60 text-xl">No cosmic transmissions found.</p>
                  <p className="text-white/40 mt-2">Try adjusting your search parameters.</p>
                </div>
              ) : (
                news.map((article, index) => (
                  <div
                    key={article._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      to={`/news/${article._id}`}
                      className="block group"
                    >
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                          <img
                            src={article.image || '/default-news.png'}
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUUxQjRCIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiM2MzY2RjEiLz4KPHRleHQgeD0iMjAwIiB5PSIxNDAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgb3BhY2l0eT0iMC41Ij5TcGFjZSBJbWFnZTwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="bg-blue-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                              NEWS
                            </div>
                            <StarButton
                              type="news"
                              itemId={article._id}
                              size="small"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(article.date)}
                          </div>
                          
                          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                            {article.title}
                          </h2>
                          
                          <p className="text-white/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {article.description}
                          </p>

                          {/* Read More Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-medium">
                              <span className="text-sm">Read Article</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                            <div className="text-xs text-white/40">
                              #{article._id?.slice(-6) || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center">
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
    </>
  );
}