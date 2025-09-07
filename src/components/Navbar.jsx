import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // âœ… used for redirect on logout

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    // âœ… Login check on route change
    setIsLoggedIn(!!localStorage.getItem('token'));

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // âœ… Logout logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); // âœ… client-side redirect
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2 bg-[#0a1526]/90 backdrop-blur-md shadow-xl' : 'py-4 bg-transparent'}`}>
        <div className="flex justify-center w-full">
          <div className="flex items-center justify-between max-w-7xl w-full px-6">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <Link to="/">
                  <span className="text-3xl font-bold text-yellow-400 z-10 relative tracking-wider">VORNIX</span>
                  <span className="absolute inset-0 text-3xl font-bold text-yellow-600 blur-sm opacity-70 tracking-wider">VORNIX</span>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex space-x-1">
                <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
                <NavLink to="/challenges" currentPath={location.pathname}>Challenges</NavLink>
                <NavLink to="/competitions" currentPath={location.pathname}>Competitions</NavLink>
                <NavLink to="/promotions" currentPath={location.pathname}>Promotions</NavLink>
                <NavLink to="/faq" currentPath={location.pathname}>FAQ</NavLink>
                <NavLink to="/about" currentPath={location.pathname}>About Us</NavLink>
              </div>
            </div>

            <div className="hidden md:block flex-shrink-0">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-white hover:text-yellow-400 transition">Dashboard</Link>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform relative overflow-hidden group"
                  >
                    <span className="relative z-10">Logout</span>
                    <span className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-300"></span>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className="px-4 py-2 text-white hover:text-yellow-400 transition">Login</Link>
                  <Link to="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform relative overflow-hidden group">
                    <span className="relative z-10">Get Funded</span>
                    <span className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-300"></span>
                  </Link>
                </div>
              )}
            </div>

            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 pt-20 bg-[#0a1526]/95 backdrop-blur-lg transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center space-y-6 p-6">
          <MobileNavLink to="/" currentPath={location.pathname}>Home</MobileNavLink>
          <MobileNavLink to="/challenges" currentPath={location.pathname}>Challenges</MobileNavLink>
          <MobileNavLink to="/competitions" currentPath={location.pathname}>Competitions</MobileNavLink>
          <MobileNavLink to="/promotions" currentPath={location.pathname}>Promotions</MobileNavLink>
          <MobileNavLink to="/faq" currentPath={location.pathname}>FAQ</MobileNavLink>
          <MobileNavLink to="/about" currentPath={location.pathname}>About Us</MobileNavLink>

          {isLoggedIn ? (
            <>
              <MobileNavLink to="/dashboard" currentPath={location.pathname}>Dashboard</MobileNavLink>
              <button 
                onClick={handleLogout}
                className="w-full max-w-xs px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg mt-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" currentPath={location.pathname}>Login</MobileNavLink>
              <Link to="/register" className="w-full max-w-xs px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg mt-4 text-center">
                Get Funded
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function NavLink({ to, children, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`relative px-4 py-2 font-medium group ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-300'}`}>
      {children}
      <span className={`absolute left-0 bottom-0 h-0.5 bg-yellow-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      <span className={`absolute left-0 bottom-0 h-[2px] bg-yellow-600 blur-sm transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
}

function MobileNavLink({ to, children, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`w-full text-center py-4 text-xl font-medium ${isActive ? 'text-yellow-400' : 'text-white'}`}>
      {children}
    </Link>
  );
}