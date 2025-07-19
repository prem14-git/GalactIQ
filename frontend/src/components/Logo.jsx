import { Link } from 'react-router-dom';

const Logo = ({ className = "", showText = true, size = "medium", linkToHome = true }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12", 
    large: "w-16 h-16",
    xlarge: "w-20 h-20"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
    xlarge: "text-2xl"
  };

  const LogoGraphic = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Large outer circle */}
      <div className="absolute inset-0 border-2 border-cyan-400 rounded-full"></div>
      
      {/* Smaller inner circle (off-center towards upper left) */}
      <div className="absolute top-1 left-1 w-1/2 h-1/2 bg-cyan-400 rounded-full"></div>
      
      {/* Larger elliptical ring */}
      <div className="absolute inset-0 border border-cyan-400 rounded-full transform rotate-12 scale-110"></div>
      
      {/* Smaller elliptical ring */}
      <div className="absolute inset-1 border border-cyan-400 rounded-full transform -rotate-6 scale-90"></div>
    </div>
  );

  const LogoText = () => (
    <span className={`font-bold text-cyan-400 tracking-wide ${textSizes[size]}`}>
      GalactIQ
    </span>
  );

  const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoGraphic />
      {showText && <LogoText />}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="hover:opacity-80 transition-opacity duration-200">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default Logo; 