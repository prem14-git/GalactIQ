import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import { toast } from 'react-toastify';

export default function Header() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check for user token on mount
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.username });
      } catch (error) {
        localStorage.removeItem('userToken');
      }
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-black/5 backdrop-blur-md border-b border-cyan-400/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="large" />
            </div>



            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/favorites"
                    className="text-cyan-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Favorites
                  </Link>
                  <Link
                    to="/space-facts"
                    className="text-orange-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Space Facts
                  </Link>
                  <Link
                    to="/quiz"
                    className="text-purple-500 hover:text-white transition-colors duration-200 font-medium cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M8 15h8M8 12h8M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Quiz
                  </Link>
                  <span className="text-cyan-400 font-medium">Hello, {user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400/30 transition-colors duration-200 border border-cyan-400/30"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-cyan-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="bg-cyan-400 text-black px-4 py-2 rounded-lg hover:bg-cyan-300 transition-colors duration-200 font-medium cursor-pointer"
                  >
                    Sign Up
                  </button>
                  {/* Only show Admin button if not logged in as user */}
                  <Link
                    to="/admin/login"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 font-medium border border-cyan-400/30"
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20"></div>

      {/* Modals */}
      <UserSignup 
        open={showSignup} 
        onClose={() => setShowSignup(false)} 
        onSuccess={user => { setUser(user); setShowSignup(false); }} 
      />
      <UserLogin 
        open={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={user => { setUser(user); setShowLogin(false); }} 
      />
    </>
  );
} 