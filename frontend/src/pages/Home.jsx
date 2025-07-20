// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import UserSignup from '../components/UserSignup';
// import UserLogin from '../components/UserLogin';
// import { toast } from 'react-toastify';

// const countries = [
//   'USA', 'Russia', 'China', 'India', 'UK', 'France', 'Germany', 'Japan', 'Canada', 'Italy'
// ];

// export default function Home() {
//   const [showSignup, setShowSignup] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check for user token on mount
//     const token = localStorage.getItem('userToken');
//     if (token) {
//       // Optionally decode token for username/email, or store in state after login/signup
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setUser({ username: payload.username });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     setUser(null);
//     toast.success('Logged out successfully!');
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       {/* Top bar with login/signup/admin */}
//       <div className="flex justify-end items-center gap-4 p-6">
//         {user ? (
//           <div className="flex items-center gap-2">
//             <span className="text-blue-800 font-semibold">Hello, {user.username}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300 transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <>
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition font-semibold"
//             >
//               User Login
//             </button>
//             <button
//               onClick={() => setShowSignup(true)}
//               className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition font-semibold"
//             >
//               Sign Up
//             </button>
//           </>
//         )}
//         <Link
//           to="/admin/login"
//           className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-lg border-2 border-white hover:border-blue-700"
//         >
//           Admin Login
//         </Link>
//       </div>
//       <div className="flex flex-col items-center justify-center flex-1">
//         <h1 className="text-4xl font-bold mb-4 text-blue-900">SpaceExplorer Hub</h1>
//         <p className="mb-8 text-lg text-gray-700 max-w-xl text-center">
//           Discover the world of space science! Browse curated profiles of notable space scientists by country and stay updated with the latest space news.
//         </p>
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold mb-2">Browse by Country</h2>
//           <div className="flex flex-wrap gap-2 justify-center">
//             {countries.map(country => (
//               <Link
//                 key={country}
//                 to={`/country/${country}`}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//               >
//                 {country}
//               </Link>
//             ))}
//           </div>
//         </div>
//         <Link
//           to="/news"
//           className="mt-4 bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition"
//         >
//           View Space News
//         </Link>
//       </div>
//       <UserSignup open={showSignup} onClose={() => setShowSignup(false)} onSuccess={user => { setUser(user); setShowSignup(false); }} />
//       <UserLogin open={showLogin} onClose={() => setShowLogin(false)} onSuccess={user => { setUser(user); setShowLogin(false); }} />
//     </div>
//   );
// } 



import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Rocket, Star, Globe, Zap, Sparkles, Moon, Sun, Satellite, Orbit, Telescope, Brain } from 'lucide-react';

const countries = [
  'USA', 'Russia', 'China', 'India', 'UK', 'France', 'Germany', 'Japan', 'Canada', 'Italy'
];

const StarField = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkle: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.twinkle}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingPlanet = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`transform hover:scale-110 transition-all duration-500 ${className}`}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

const GlowingButton = ({ children, className = "", ...props }) => (
  <button
    className={`relative overflow-hidden group ${className}`}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  </button>
);

const CountryCard = ({ country, index }) => (
  <Link
    to={`/country/${country}`}
    className="group relative overflow-hidden"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white px-6 py-4 rounded-xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 border border-purple-500/30 hover:border-purple-400/60">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex items-center gap-3">
        <Globe className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
        <span className="font-semibold">{country}</span>
        <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
    </div>
  </Link>
);

const ParticleOrbit = ({ size = 'small', color = 'blue', delay = 0 }) => {
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };
  
  const colorClasses = {
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    pink: 'bg-pink-400',
    cyan: 'bg-cyan-400'
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className={`absolute top-1/2 left-1/2 ${sizeClasses[size]} ${colorClasses[color]} rounded-full opacity-60 transform -translate-x-1/2 -translate-y-1/2`}
        style={{
          animation: `orbit ${20 + delay}s linear infinite`,
          transformOrigin: `${Math.random() * 300 + 150}px ${Math.random() * 300 + 150}px`
        }}
      />
    </div>
  );
};

export default function Home() {
  const [showRocketAnimation, setShowRocketAnimation] = useState(true);

  // Hide rocket animation after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRocketAnimation(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Rocket Launch Animation */}
      {showRocketAnimation && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Rocket */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-rocket-launch">
            <div className="relative">
              {/* Rocket Body */}
              <div className="w-8 h-24 bg-gradient-to-b from-white via-gray-200 to-gray-300 rounded-t-full relative">
                {/* Rocket Windows */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
                
                {/* Rocket Fins */}
                <div className="absolute bottom-0 left-0 w-3 h-6 bg-red-500 transform -skew-x-12"></div>
                <div className="absolute bottom-0 right-0 w-3 h-6 bg-red-500 transform skew-x-12"></div>
                
                {/* Rocket Tip */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
              </div>
              
              {/* Engine Fire */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-b-full animate-pulse"></div>
                <div className="w-4 h-6 bg-gradient-to-t from-red-500 via-orange-400 to-transparent rounded-b-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Smoke Trail */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-32 bg-gradient-to-t from-gray-400 via-gray-300 to-transparent rounded-t-full animate-smoke-rise opacity-60"></div>
            <div className="w-8 h-24 bg-gradient-to-t from-gray-500 via-gray-400 to-transparent rounded-t-full animate-smoke-rise opacity-40" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Launch Platform */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t-full"></div>
            <div className="w-16 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t-full"></div>
          </div>
          
          {/* Particle Effects */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-particle-spread"
                style={{
                  left: `${Math.random() * 40 - 20}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
          

        </div>
      )}
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/30 via-transparent to-purple-900/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Star Field */}
      <StarField />
      
      {/* Particle Orbits */}
      <ParticleOrbit size="small" color="blue" delay={0} />
      <ParticleOrbit size="medium" color="purple" delay={5} />
      <ParticleOrbit size="large" color="pink" delay={10} />
      <ParticleOrbit size="small" color="cyan" delay={15} />
      
      {/* Floating Cosmic Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingPlanet delay={0} className="absolute top-20 left-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full shadow-2xl opacity-60 relative">
            <div className="absolute inset-2 bg-gradient-to-tl from-blue-300 to-purple-400 rounded-full opacity-50"></div>
          </div>
        </FloatingPlanet>
        <FloatingPlanet delay={1} className="absolute top-40 right-20">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-2xl opacity-50 relative">
            <div className="absolute inset-1 bg-gradient-to-tl from-yellow-300 to-orange-400 rounded-full opacity-60"></div>
          </div>
        </FloatingPlanet>
        <FloatingPlanet delay={2} className="absolute bottom-40 left-20">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-600 rounded-full shadow-2xl opacity-40"></div>
        </FloatingPlanet>
        <FloatingPlanet delay={0.5} className="absolute bottom-60 right-10">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-red-600 rounded-full shadow-2xl opacity-45 relative">
            <div className="absolute inset-2 bg-gradient-to-tl from-pink-300 to-red-400 rounded-full opacity-50"></div>
          </div>
        </FloatingPlanet>
        <FloatingPlanet delay={1.5} className="absolute top-60 left-1/2">
          <Satellite className="w-8 h-8 text-cyan-400 opacity-60 animate-spin" style={{ animationDuration: '10s' }} />
        </FloatingPlanet>
        <FloatingPlanet delay={2.5} className="absolute bottom-20 right-1/3">
          <Telescope className="w-6 h-6 text-purple-400 opacity-50" />
        </FloatingPlanet>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 px-6 py-6 scroll-container">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-6xl">
            <div className="relative mb-8">

              {/* <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text colorful-text">
                <span className="inline-block animate-pulse">Space</span>
                <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>Explorer</span>
                <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}> Hub</span>
              </h1> */}

              {/* <h1 className="text-6xl md:text-8xl font-bold mb-6 text-purple-500 animate-pulse drop-shadow-[0_0_10px_rgba(192,132,252,0.7)]">
                <span className="inline-block">Space</span>
                <span className="inline-block" style={{ animationDelay: '0.5s' }}>Explorer</span>
                <span className="inline-block" style={{ animationDelay: '1s' }}> Hub</span>
              </h1> */}

              <h1 className="text-6xl md:text-8xl font-bold mb-22 text-purple-500 mt-20">
                <span className="inline-block animate-pulse">Galact</span>
                <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>IQ</span>
                {/* <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}> Hub</span> */}
              </h1>


              <div className="absolute -top-4 -right-4 animate-bounce">
                <Rocket className="w-16 h-16 text-orange-400 transform rotate-45" />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Orbit className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
            <div className="relative backdrop-blur-sm bg-black/20 rounded-3xl p-8 mb-8 border border-purple-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              <p className="relative text-xl md:text-2xl text-gray-300 leading-relaxed">
                🚀 Embark on an <span className="text-cyan-400 font-bold animate-pulse">infinite journey</span> through the cosmos! 
                <br />
                Discover profiles of <span className="text-purple-400 font-bold animate-pulse">legendary space pioneers</span> from around the world
                <br />
                and stay connected with the latest <span className="text-pink-400 font-bold animate-pulse">astronomical breakthroughs</span>. ✨
              </p>
            </div>
          </div>

          {/* Countries Section */}
          <div className="mb-16 w-full max-w-7xl">
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-22 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 Explore by Country
            </h2> */}
            <h2 className="text-4xl md:text-5xl font-bold mb-22 text-center text-purple-500 ">
              🌍 Explore by Country
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-fade-in">
              {countries.map((country, index) => (
                <CountryCard key={country} country={country} index={index} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* News Button */}
            <div className="transform hover:scale-105 transition-all duration-300">
              <Link
                to="/news"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-16 py-6 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border-2 border-emerald-400/50 hover:border-emerald-300 text-2xl font-bold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <Star className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                  🌟 View Space News
                  <Sparkles className="w-8 h-8 group-hover:animate-spin transition-transform duration-500" />
                </div>
              </Link>
            </div>


          </div>

          {/* Extra Content for Scrolling */}
          {/* <div className="w-full max-w-4xl mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">🛰️ Latest Missions</h3>
                <p className="text-gray-300 leading-relaxed">
                  Stay updated with the most recent space missions from agencies worldwide. From Mars rovers to space station expeditions, discover the cutting-edge of space exploration.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">🔬 Research Hub</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dive deep into the scientific breakthroughs that are shaping our understanding of the universe. From quantum physics to astrophysics, explore the frontiers of knowledge.
                </p>
              </div>
            </div>
          </div> */}
        </main>
      </div>

      {/* Custom Animations and Beautiful Scrollbar */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        /* Glow effect for buttons */
        .group:hover::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899);
          border-radius: inherit;
          opacity: 0.7;
          z-index: -1;
          animation: glow-rotate 2s linear infinite;
        }
        
        @keyframes glow-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        /* Rocket Launch Animations */
        @keyframes rocket-launch {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          20% {
            transform: translate(-50%, -20vh) scale(1.1);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -40vh) scale(1.2);
            opacity: 1;
          }
          60% {
            transform: translate(-50%, -60vh) scale(1.3);
            opacity: 0.8;
          }
          80% {
            transform: translate(-50%, -80vh) scale(1.4);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -100vh) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes smoke-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(2);
            opacity: 0;
          }
        }
        
        @keyframes particle-spread {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(var(--spread-x, 0)) scale(0);
            opacity: 0;
          }
        }
        
        .animate-rocket-launch {
          animation: rocket-launch 4s ease-out forwards;
        }
        
        .animate-smoke-rise {
          animation: smoke-rise 3s ease-out forwards;
        }
        
        .animate-particle-spread {
          animation: particle-spread 2s ease-out forwards;
        }
        
        /* Cosmic Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 14px;
          background: transparent;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          border-radius: 12px;
          border: 2px solid rgba(139, 92, 246, 0.3);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6 0%, #ec4899 30%, #06b6d4 60%, #8b5cf6 100%);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 0 15px rgba(139, 92, 246, 0.6),
            0 0 25px rgba(236, 72, 153, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.1);
          animation: scrollbar-glow 3s ease-in-out infinite alternate;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a855f7 0%, #f472b6 30%, #0891b2 60%, #a855f7 100%);
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.8), 
            0 0 35px rgba(236, 72, 153, 0.6),
            0 0 45px rgba(6, 182, 212, 0.4),
            inset 0 0 15px rgba(255, 255, 255, 0.2);
          animation: scrollbar-glow 1s ease-in-out infinite alternate;
        }
        
        ::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, #c084fc 0%, #f9a8d4 30%, #67e8f9 60%, #c084fc 100%);
          box-shadow: 
            0 0 25px rgba(139, 92, 246, 1), 
            0 0 40px rgba(236, 72, 153, 0.8),
            0 0 55px rgba(6, 182, 212, 0.6),
            inset 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        ::-webkit-scrollbar-corner {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          border-radius: 6px;
        }
        
        @keyframes scrollbar-glow {
          0% { 
            filter: brightness(1) saturate(1);
          }
          100% { 
            filter: brightness(1.3) saturate(1.2);
          }
        }
        
        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 #1a1a2e;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for containers */
        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 rgba(26, 26, 46, 0.5);
        }
        
        .scroll-container::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        .scroll-container::-webkit-scrollbar-track {
          background: rgba(26, 26, 46, 0.5);
          border-radius: 8px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .scroll-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
        }
        
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #a855f7, #f472b6, #0891b2);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
        }
      `}</style>
    </div>
  );
}