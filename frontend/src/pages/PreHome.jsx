import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomButton from '../components/CustomButton';

export default function PreHome() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-space-dark"
      style={{ background: `url('/prehome-bg.png') center/cover no-repeat` }}>
      {/* Animated background with cosmic overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/prehome-bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        {/* Title with gradient and animation */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text animate-glow-slow drop-shadow-lg">
            GalactIQ
          </h1>
        </div>
        {/* Subtitle with fade-in and color */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
          <p className="max-w-3xl text-xl md:text-2xl lg:text-3xl font-semibold mb-4 leading-relaxed text-white animate-pulse">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">Explore the Cosmos. Discover the Minds.</span>
          </p>
          <p className="max-w-2xl text-lg md:text-xl mb-12 font-light leading-relaxed animate-fade-in-up text-cyan-200">
            Unveiling the groundbreaking work of scientists worldwide and bringing you the latest marvels from across the universe.
          </p>
        </div>
        {/* CTA Button with cosmic styling */}
        <div className={`transition-all duration-1000 delay-600 ${isLoaded ? 'animate-scale-in opacity-100' : 'opacity-0'}`}>
          <CustomButton onClick={() => navigate('/home')}>
            EXPLORE THE UNIVERSE
          </CustomButton>
        </div>
        {/* Removed scroll indicator and mouse symbol */}
      </div>
      {/* Ambient cosmic effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      {/* Keyframes for fade/slide-in and glow */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes glow-slow {
          0%, 100% { filter: drop-shadow(0 0 32px #a21caf88); }
          50% { filter: drop-shadow(0 0 64px #f472b6cc); }
        }
        .animate-glow-slow { animation: glow-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}