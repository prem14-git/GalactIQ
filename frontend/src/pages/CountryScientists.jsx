// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';

// export default function CountryScientists({ countryOverride }) {
//   const params = useParams();
//   const country = countryOverride || params.country;
//   const [scientists, setScientists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios.get(`/api/scientists?country=${country}&search=${encodeURIComponent(search)}`)
//       .then(res => {
//         setScientists(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to load scientists.');
//         setLoading(false);
//       });
//   }, [country, search]);

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6 text-blue-800">Space Scientists from {country}</h1>
//       <SearchBar value={search} onChange={setSearch} placeholder="Search scientists..." />
//       {loading && <div className="text-gray-500">Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {scientists.map(scientist => (
//           <Link
//             to={`/scientist/${scientist._id}`}
//             key={scientist._id}
//             className="block bg-white rounded shadow p-4 hover:shadow-lg transition"
//             {...(countryOverride ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
//           >
//             <img
//               src={scientist.photo || '/default-scientist.png'}
//               alt={scientist.name}
//               className="w-full h-48 object-cover rounded mb-2"
//             />
//             <h2 className="text-xl font-semibold text-blue-700">{scientist.name}</h2>
//             <p className="text-gray-600 mb-1">{scientist.country}</p>
//             <p className="text-gray-700 text-sm line-clamp-3">{scientist.contributions}</p>
//           </Link>
//         ))}
//       </div>
//       <div className="mt-8">
//         <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Home</Link>
//       </div>
//     </div>
//   );
// } 




import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StarButton from '../components/StarButton';

export default function CountryScientists({ countryOverride }) {
  const params = useParams();
  const country = countryOverride || params.country;
  const [scientists, setScientists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [favoriteIds, setFavoriteIds] = useState([]);

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

  // Fetch scientists
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/scientists?country=${country}&search=${encodeURIComponent(search)}`)
      .then(res => {
        setScientists(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load scientists.');
        setLoading(false);
      });
  }, [country, search]);

  // Fetch user's favorite scientist IDs
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) return;
    axios.get('/api/users/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setFavoriteIds(res.data.scientists.map(s => s._id));
      })
      .catch(() => {});
  }, [country]);

  // Handle star toggle
  const handleStarToggle = (type, itemId, isFavorite) => {
    setFavoriteIds(prev => {
      if (isFavorite) {
        return [...prev, itemId];
      } else {
        return prev.filter(id => id !== itemId);
      }
    });
  };

  // Generate random stars
  const generateStars = () => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
  };

  const stars = generateStars();

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
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 0.8s ease-out 0.5s forwards;
          width: 0;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
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
          {Array.from({ length: 20 }, (_, i) => (
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
          <div className="text-center mb-12 transform animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
              Space Scientists
            </h1>
            <h2 className="text-3xl font-semibold text-white mb-8 animate-slide-in-left">
              From {country}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-expand"></div>
          </div>

          {/* Search Bar */}
          <div className="mb-12 transform animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search scientists..."
                  className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 animate-pulse"></div> */}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block relative">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin-reverse"></div>
              </div>
              <p className="text-white mt-4 text-lg animate-pulse">Loading space scientists...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-red-400 text-6xl mb-4">🚀</div>
                <p className="text-red-300 text-lg">{error}</p>
              </div>
            </div>
          )}

          {/* Scientists Grid */}
          {!loading && !error && scientists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {scientists.map((scientist, index) => (
                <Link
                  to={`/scientist/${scientist._id}`}
                  key={scientist._id}
                  className="group block transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Card Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Border Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      {/* Scientist Image */}
                      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                        <img
                          src={scientist.photo || '/default-scientist.png'}
                          alt={scientist.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Scientist Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {scientist.name}
                        </h3>
                        <p className="text-blue-300 font-medium flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                          {scientist.country}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                          {scientist.contributions}
                        </p>
                      </div>

                      {/* Star Button */}
                      <div className="absolute top-4 right-4">
                        <StarButton
                          type="scientist"
                          itemId={scientist._id}
                          size="medium"
                          initialFavorited={favoriteIds.includes(scientist._id)}
                          onToggle={handleStarToggle}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!loading && !error && scientists.length === 0 && (
            <div className="text-center py-20">
              <div className="text-white/60 text-6xl mb-4">🔍</div>
              <p className="text-white/80 text-lg">No scientists found matching your search criteria.</p>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="text-center">
            <Link 
              to="/home" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}




