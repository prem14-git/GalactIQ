import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SpaceFacts() {
  const [currentFact, setCurrentFact] = useState(null);
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

  const fetchRandomFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/space-facts/random');
      setCurrentFact(response.data);
    } catch (error) {
      console.error('Error fetching space fact:', error);
      setError('Failed to load space fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
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
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-glow">
              🚀 Space Facts
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Fact Display */}
          <div className="mb-8">
            {loading && (
              <div className="text-center py-20">
                <div className="inline-block relative mb-4">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-orange-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
                <p className="text-white/70 text-lg animate-pulse">Loading cosmic knowledge...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-red-400 text-6xl mb-4">⚠️</div>
                  <p className="text-red-300 text-lg mb-4">{error}</p>
                  <button
                    onClick={fetchRandomFact}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && currentFact && (
              <div className="animate-scale-in">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={currentFact.imageUrl}
                      alt={currentFact.title}
                      className="w-full h-96 object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUUxQjRCIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIwMCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHRleHQgeD0iNDAwIiB5PSIzMDAiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgb3BhY2l0eT0iMC41Ij5OQVNBIEFQTyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Removed Date Badge */}
                    
                    {/* Copyright Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                      © {currentFact.copyright}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                      {currentFact.title}
                    </h2>
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {currentFact.explanation}
                      </p>
                    </div>


                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={fetchRandomFact}
              disabled={loading}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-12 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-300 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                {loading ? 'Loading...' : 'Get Another Space Fact!'}
                <span className="text-2xl">✨</span>
              </div>
            </button>


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
    </>
  );
} 