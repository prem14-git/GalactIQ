// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import CommentSection from '../components/CommentSection';

// export default function ScientistProfile() {
//   const { id } = useParams();
//   const [scientist, setScientist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios.get(`/api/scientists/${id}`)
//       .then(res => {
//         setScientist(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Failed to load scientist.');
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div className="text-gray-500 p-8">Loading...</div>;
//   if (error || !scientist) return <div className="text-red-500 p-8">{error || 'Scientist not found.'}</div>;

//   return (
//     <div className="max-w-2xl mx-auto py-8">
//       <Link to={`/country/${scientist.country}`} className="text-blue-500 hover:underline">&larr; Back to {scientist.country}</Link>
//       <div className="bg-white rounded shadow p-6 mt-4">
//         <img
//           src={scientist.photo || '/default-scientist.png'}
//           alt={scientist.name}
//           className="w-full h-64 object-cover rounded mb-4"
//         />
//         <h1 className="text-3xl font-bold text-blue-800 mb-2">{scientist.name}</h1>
//         <p className="text-gray-600 mb-2">Country: {scientist.country}</p>
//         <p className="text-gray-700 mb-4">{scientist.contributions}</p>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Comments</h2>
//         <CommentSection parentType="scientist" parentId={scientist._id} />
//       </div>
//     </div>
//   );
// } 




import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import StarButton from '../components/StarButton';

export default function ScientistProfile() {
  const { id } = useParams();
  const [scientist, setScientist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    axios.get(`/api/scientists/${id}`)
      .then(res => {
        setScientist(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load scientist.');
        setLoading(false);
      });
  }, [id]);

  // Generate random stars
  const generateStars = () => {
    return Array.from({ length: 150 }, (_, i) => ({
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
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
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
            width: 12rem;
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
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.4s forwards;
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
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.6s forwards;
          opacity: 0;
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
          {Array.from({ length: 25 }, (_, i) => (
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
        <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block relative">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin-reverse"></div>
              </div>
              <p className="text-white mt-4 text-lg animate-pulse">Loading scientist profile...</p>
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

          {/* Scientist Profile */}
          {!loading && !error && scientist && (
            <>
              {/* Back Button */}
              <div className="mb-8 animate-fade-in-up">
                <Link 
                  to={`/country/${scientist.country}`} 
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to {scientist.country}
                </Link>
              </div>

              {/* Hero Section */}
              <div className="text-center mb-12 transform animate-fade-in-up">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
                    {scientist.name}
                  </h1>
                  <StarButton
                    type="scientist"
                    itemId={scientist._id}
                    size="large"
                  />
                </div>
                <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-expand"></div>
              </div>

              {/* Main Profile Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden mb-12 animate-scale-in">
                <div className="relative">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Scientist Image */}
                    <div className="animate-slide-in-left">
                      <div className="relative overflow-hidden rounded-2xl aspect-square max-w-sm mx-auto">
                        <img
                          src={scientist.photo || '/default-scientist.png'}
                          alt={scientist.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
                        
                        {/* Floating Border Effect */}
                        {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div> */}
                      </div>
                    </div>

                    {/* Scientist Info */}
                    <div className="space-y-6 animate-slide-in-right">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-blue-300 font-semibold text-lg">Country</span>
                        </div>
                        <p className="text-2xl font-bold text-white pl-6">
                          {scientist.country}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-purple-300 font-semibold text-lg">Contributions</span>
                        </div>
                        <p className="text-gray-200 leading-relaxed pl-6 text-lg">
                          {scientist.contributions}
                        </p>
                      </div>

                      {/* Additional Stats/Info Cards */}
                      {/* <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="text-blue-300 text-sm font-medium">Field</div>
                          <div className="text-white font-bold">Space Science</div>
                        </div>
                        <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="text-purple-300 text-sm font-medium">Status</div>
                          <div className="text-white font-bold">Active</div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                      <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Comments & Discussion
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                    <CommentSection parentType="scientist" parentId={scientist._id} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Scientist Not Found */}
          {!loading && !error && !scientist && (
            <div className="text-center py-20">
              <div className="text-white/60 text-6xl mb-4">👨‍🚀</div>
              <p className="text-white/80 text-lg">Scientist not found in our database.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}