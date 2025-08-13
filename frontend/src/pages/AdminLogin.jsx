import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-blue-800 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
        
        {/* Back to Homepage Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-600 hover:text-blue-600 transition-colors text-sm underline"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
      <h4 className='text-gray-500 text-sm'>Username : prem , Password : 1</h4>
    </div>
  );
} 



// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post('/api/admin/login', { username, password });
//       localStorage.setItem('adminToken', res.data.token);
//       setLoading(false);
//       navigate('/admin/dashboard');
//     } catch (err) {
//       setError('Invalid credentials');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
//       {/* Cosmic Background */}
//       <div className="absolute inset-0">
//         {/* Nebula Background */}
//         <div className="nebula-bg"></div>
        
//         {/* Stars */}
//         <div className="stars-layer-1"></div>
//         <div className="stars-layer-2"></div>
//         <div className="stars-layer-3"></div>
        
//         {/* Floating Particles */}
//         <div className="particles">
//           {[...Array(20)].map((_, i) => (
//             <div key={i} className={`particle particle-${i}`}></div>
//           ))}
//         </div>
        
//         {/* Animated Grid */}
//         <div className="cyber-grid"></div>
//       </div>

//       {/* Central Portal Ring */}
//       <div className="portal-ring">
//         <div className="portal-inner-ring"></div>
//       </div>

//       {/* Login Portal */}
//       <div className="relative z-20 login-container">
//         <div className="login-panel">
//           {/* Header with Animated Title */}
//           <div className="text-center mb-8">
//             <div className="cosmic-logo">
//               <svg className="w-16 h-16 mx-auto mb-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
//               </svg>
//               <div className="glitch-text">SPACE COMMAND</div>
//             </div>
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider">
//               ADMIN PORTAL
//             </h1>
//             <p className="text-gray-400 mt-2">Secure Access to Mission Control</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Username Field */}
//             <div className="input-group">
//               <div className="input-container">
//                 <div className="input-icon">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   className="cosmic-input"
//                   placeholder="COMMANDER ID"
//                   value={username}
//                   onChange={e => setUsername(e.target.value)}
//                   required
//                 />
//                 <div className="input-border"></div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="input-group">
//               <div className="input-container">
//                 <div className="input-icon">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   className="cosmic-input"
//                   type="password"
//                   placeholder="SECURITY CODE"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   required
//                 />
//                 <div className="input-border"></div>
//               </div>
//             </div>

//             {/* Launch Button */}
//             <button
//               type="submit"
//               className="launch-button"
//               disabled={loading}
//             >
//               <div className="button-content">
//                 {loading ? (
//                   <>
//                     <div className="loading-ring"></div>
//                     <span className="ml-3">INITIALIZING...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     INITIATE ACCESS
//                   </>
//                 )}
//               </div>
//               <div className="button-glow"></div>
//             </button>

//             {/* Error Display */}
//             {error && (
//               <div className="error-panel">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//                 <span>ACCESS DENIED: {error}</span>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>

//       {/* Enhanced Cosmic Styles */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

//         .login-container {
//           font-family: 'Orbitron', monospace;
//         }

//         .nebula-bg {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(ellipse at center, rgba(120, 119, 198, 0.3) 0%, rgba(255, 255, 255, 0) 50%), 
//                       radial-gradient(ellipse at center, rgba(255, 0, 128, 0.15) 0%, rgba(255, 255, 255, 0) 50%),
//                       radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%);
//           animation: nebula-drift 20s ease-in-out infinite alternate;
//         }

//         .stars-layer-1, .stars-layer-2, .stars-layer-3 {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-image: 
//             radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent),
//             radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.6), transparent),
//             radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.9), transparent),
//             radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
//             radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.5), transparent);
//           background-repeat: repeat;
//           background-size: 200px 100px;
//         }

//         .stars-layer-1 {
//           animation: twinkle 3s ease-in-out infinite alternate;
//         }

//         .stars-layer-2 {
//           animation: twinkle 2s ease-in-out infinite alternate-reverse;
//           opacity: 0.8;
//         }

//         .stars-layer-3 {
//           animation: twinkle 4s ease-in-out infinite alternate;
//           opacity: 0.6;
//         }

//         .particles {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//         }

//         .particle {
//           position: absolute;
//           width: 4px;
//           height: 4px;
//           background: rgba(0, 255, 255, 0.8);
//           border-radius: 50%;
//           animation: float 6s ease-in-out infinite;
//         }

//         .particle:nth-child(odd) {
//           background: rgba(255, 0, 128, 0.6);
//           animation-duration: 8s;
//         }

//         .particle:nth-child(3n) {
//           background: rgba(255, 255, 0, 0.7);
//           animation-duration: 10s;
//         }

//         .cyber-grid {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-image: 
//             linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
//           background-size: 100px 100px;
//           animation: grid-move 20s linear infinite;
//         }

//         .portal-ring {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 400px;
//           height: 400px;
//           border: 2px solid rgba(0, 255, 255, 0.3);
//           border-radius: 50%;
//           animation: portal-rotate 10s linear infinite;
//         }

//         .portal-inner-ring {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 300px;
//           height: 300px;
//           border: 1px solid rgba(255, 0, 128, 0.4);
//           border-radius: 50%;
//           animation: portal-rotate 8s linear infinite reverse;
//         }

//         .login-panel {
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(0, 255, 255, 0.3);
//           border-radius: 20px;
//           padding: 3rem;
//           width: 100%;
//           max-width: 450px;
//           box-shadow: 
//             0 0 50px rgba(0, 255, 255, 0.2),
//             inset 0 0 50px rgba(0, 0, 0, 0.5);
//           position: relative;
//           overflow: hidden;
//         }

//         .login-panel::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
//           animation: scan-line 3s linear infinite;
//         }

//         .cosmic-logo svg {
//           filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
//           animation: logo-pulse 2s ease-in-out infinite;
//         }

//         .glitch-text {
//           font-size: 0.9rem;
//           font-weight: 700;
//           color: #00ffff;
//           text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
//           animation: glitch 2s ease-in-out infinite;
//         }

//         .input-group {
//           position: relative;
//         }

//         .input-container {
//           position: relative;
//         }

//         .input-icon {
//           position: absolute;
//           left: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 2;
//           color: #00ffff;
//         }

//         .cosmic-input {
//           width: 100%;
//           padding: 1rem 1rem 1rem 3rem;
//           background: rgba(0, 0, 0, 0.7);
//           border: 1px solid rgba(0, 255, 255, 0.3);
//           border-radius: 12px;
//           color: #ffffff;
//           font-family: 'Orbitron', monospace;
//           font-size: 0.9rem;
//           letter-spacing: 0.05em;
//           transition: all 0.3s ease;
//         }

//         .cosmic-input::placeholder {
//           color: rgba(255, 255, 255, 0.5);
//         }

//         .cosmic-input:focus {
//           outline: none;
//           border-color: #00ffff;
//           box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
//           background: rgba(0, 0, 0, 0.9);
//         }

//         .input-border {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           border: 1px solid transparent;
//           border-radius: 12px;
//           background: linear-gradient(45deg, #00ffff, #ff0080, #ffff00, #00ffff);
//           background-size: 400% 400%;
//           padding: 1px;
//           opacity: 0;
//           animation: border-flow 3s ease-in-out infinite;
//           transition: opacity 0.3s ease;
//         }

//         .cosmic-input:focus + .input-border {
//           opacity: 1;
//         }

//         .launch-button {
//           width: 100%;
//           position: relative;
//           padding: 1rem 2rem;
//           background: linear-gradient(135deg, #00ffff, #0080ff, #8000ff);
//           border: none;
//           border-radius: 12px;
//           color: #ffffff;
//           font-family: 'Orbitron', monospace;
//           font-weight: 700;
//           font-size: 1rem;
//           letter-spacing: 0.1em;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           overflow: hidden;
//         }

//         .launch-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
//         }

//         .launch-button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .button-content {
//           position: relative;
//           z-index: 2;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .button-glow {
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//           animation: button-shine 2s linear infinite;
//         }

//         .loading-ring {
//           width: 20px;
//           height: 20px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-top: 2px solid #ffffff;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .error-panel {
//           background: rgba(255, 0, 0, 0.1);
//           border: 1px solid rgba(255, 0, 0, 0.3);
//           border-radius: 8px;
//           padding: 1rem;
//           color: #ff6b6b;
//           font-size: 0.9rem;
//           display: flex;
//           align-items: center;
//           animation: error-pulse 2s ease-in-out infinite;
//         }

//         /* Animations */
//         @keyframes nebula-drift {
//           0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
//           33% { transform: translateX(30px) translateY(-30px) rotate(120deg); }
//           66% { transform: translateX(-20px) translateY(20px) rotate(240deg); }
//         }

//         @keyframes twinkle {
//           from { opacity: 0.3; }
//           to { opacity: 1; }
//         }

//         @keyframes float {
//           0%, 100% { 
//             transform: translateY(0px) translateX(0px) rotate(0deg);
//             opacity: 0.8;
//           }
//           33% { 
//             transform: translateY(-20px) translateX(10px) rotate(120deg);
//             opacity: 1;
//           }
//           66% { 
//             transform: translateY(10px) translateX(-15px) rotate(240deg);
//             opacity: 0.6;
//           }
//         }

//         @keyframes grid-move {
//           from { transform: translate(0, 0); }
//           to { transform: translate(100px, 100px); }
//         }

//         @keyframes portal-rotate {
//           from { transform: translate(-50%, -50%) rotate(0deg); }
//           to { transform: translate(-50%, -50%) rotate(360deg); }
//         }

//         @keyframes scan-line {
//           from { left: -100%; }
//           to { left: 100%; }
//         }

//         @keyframes logo-pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }

//         @keyframes glitch {
//           0%, 100% { 
//             text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
//           }
//           25% { 
//             text-shadow: -2px 0 rgba(255, 0, 0, 0.8), 2px 0 rgba(0, 255, 255, 0.8);
//           }
//           50% { 
//             text-shadow: 2px 0 rgba(255, 0, 0, 0.8), -2px 0 rgba(0, 255, 255, 0.8);
//           }
//           75% { 
//             text-shadow: 0 0 10px rgba(255, 255, 0, 0.8);
//           }
//         }

//         @keyframes border-flow {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }

//         @keyframes button-shine {
//           from { left: -100%; }
//           to { left: 100%; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes error-pulse {
//           0%, 100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3); }
//           50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.6); }
//         }

//         /* Position particles randomly */
//         ${[...Array(20)].map((_, i) => `
//         .particle-${i} {
//           top: ${Math.random() * 100}%;
//           left: ${Math.random() * 100}%;
//           animation-delay: ${Math.random() * 6}s;
//         }
//         `).join('')}

//         /* Responsive Design */
//         @media (max-width: 640px) {
//           .login-panel {
//             margin: 1rem;
//             padding: 2rem 1.5rem;
//           }
          
//           .portal-ring {
//             width: 300px;
//             height: 300px;
//           }
          
//           .portal-inner-ring {
//             width: 200px;
//             height: 200px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }





