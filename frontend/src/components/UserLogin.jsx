// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function UserLogin({ open, onClose, onSuccess }) {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post('/api/users/login', { usernameOrEmail, password });
//       localStorage.setItem('userToken', res.data.token);
//       toast.success('Login successful!');
//       onSuccess(res.data.user);
//       setUsernameOrEmail(''); setPassword('');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed');
//       toast.error(err.response?.data?.error || 'Login failed');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
//         <h2 className="text-2xl font-bold mb-4 text-blue-700">User Login</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             className="border p-2 rounded"
//             placeholder="Username or Email"
//             value={usernameOrEmail}
//             onChange={e => setUsernameOrEmail(e.target.value)}
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
//             {loading ? 'Logging in...' : 'Login'}
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

export default function UserLogin({ open, onClose, onSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Generate animated stars for background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!usernameOrEmail.trim()) {
      errors.usernameOrEmail = 'Username or Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } 
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/users/login', { usernameOrEmail, password });
      localStorage.setItem('userToken', res.data.token);
      toast.success('Login successful!');
      onSuccess(res.data.user);
      setUsernameOrEmail('');
      setPassword('');
      setFormErrors({});
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#6366f1 #1f2937' }}
      role="dialog"
      aria-labelledby="login-modal-title"
      aria-modal="true"
    >
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #8b5cf6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4f46e5, #7c3aed);
        }
      `}</style>

      {/* Animated space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + star.delay}s`,
            }}
          />
        ))}
        <div
          className="absolute top-16 right-16 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-50"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute top-48 left-12 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce opacity-40"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-24 right-24 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping opacity-60"
          style={{ animationDuration: '3s' }}
        />
      </div>

      {/* Modal backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-label="Close login modal"
      />

      {/* Modal content */}
      <div className="relative w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 rounded-2xl shadow-2xl border border-cyan-500/30 backdrop-blur-lg overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-75 blur-sm animate-pulse" />
          
          {/* Content container */}
          <div className="relative bg-gray-900/90 m-1 rounded-xl p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 id="login-modal-title" className="text-2xl font-bold text-white">
                Login
              </h2>
              <p className="text-gray-400 mt-2">Access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-300">
                  Username or Email
                </label>
                <input
                  id="usernameOrEmail"
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className={`mt-1 w-full px-4 py-2 bg-gray-800/50 border ${
                    formErrors.usernameOrEmail ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                  placeholder="Enter your username or email"
                  autoComplete="username"
                  disabled={loading}
                  aria-describedby={formErrors.usernameOrEmail ? 'usernameOrEmail-error' : undefined}
                />
                {formErrors.usernameOrEmail && (
                  <p id="usernameOrEmail-error" className="mt-1 text-sm text-red-500">
                    {formErrors.usernameOrEmail}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 w-full px-4 py-2 bg-gray-800/50 border ${
                    formErrors.password ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  aria-describedby={formErrors.password ? 'password-error' : undefined}
                />
                {formErrors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Additional links */}
            {/* <div className="mt-6 text-center">
              <a
                href="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}