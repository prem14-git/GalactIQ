export default function CustomButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-6 text-xl font-bold rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/40 ${className}`}
    >
      {children}
    </button>
  );
} 