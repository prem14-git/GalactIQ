// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function UserSignup({ open, onClose, onSuccess }) {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post('/api/users/signup', { username, email, password });
//       localStorage.setItem('userToken', res.data.token);
//       toast.success('Signup successful!');
//       onSuccess(res.data.user);
//       setUsername(''); setEmail(''); setPassword('');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Signup failed');
//       toast.error(err.response?.data?.error || 'Signup failed');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
//         <h2 className="text-2xl font-bold mb-4 text-blue-700">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             className="border p-2 rounded"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//           <input
//             className="border p-2 rounded"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             disabled={loading}
//           >
//             {loading ? 'Signing up...' : 'Sign Up'}
//           </button>
//           {error && <div className="text-red-500 text-sm">{error}</div>}
//         </form>
//       </div>
//     </div>
//   );
// } 


import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function UserSignup({ open, onClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for background animation
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 3
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('/api/users/signup', { username, email, password });
      localStorage.setItem('userToken', res.data.token);
      toast.success('Signup successful! Welcome to GalactIQ!');
      onSuccess(res.data.user);
      setUsername(''); 
      setEmail(''); 
      setPassword('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Signup failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden">
        {/* Animated stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + star.delay}s`
            }}
          />
        ))}
        
        {/* Floating planets */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-bounce opacity-60" style={{animationDuration: '4s'}} />
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse opacity-50" style={{animationDuration: '3s'}} />
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-ping opacity-40" style={{animationDuration: '5s'}} />
      </div>

      {/* Modal backdrop with click to close */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-lg overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-75 blur-sm animate-pulse" />
          
          {/* Content container */}
          <div className="relative bg-gray-900/90 m-1 rounded-xl p-8">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with rocket icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                Join the Galaxy
              </h2>
              <p className="text-gray-400 text-sm">Create your cosmic account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Space Commander Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 hover:bg-gray-800/70"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </div>

              {/* Email input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Galactic Communication ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 hover:bg-gray-800/70"
                    placeholder="commander@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </div>

              {/* Password input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Security Access Code
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 hover:bg-gray-800/70"
                    placeholder="Enter secure password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                )}
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Launching into Space...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Launch Mission
                    </>
                  )}
                </span>
              </button>

              {/* Error message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 animate-pulse">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Ready to explore the cosmos? 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}