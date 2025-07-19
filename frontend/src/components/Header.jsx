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
                </>
              )}
              
              <Link
                to="/admin/login"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 font-medium border border-cyan-400/30"
              >
                Admin
              </Link>
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