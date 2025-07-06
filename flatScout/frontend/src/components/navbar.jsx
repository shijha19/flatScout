import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check login state from localStorage
    setIsLoggedIn(!!localStorage.getItem('userLoggedIn'));
  }, [location]);

  const handleLogout = () => {
    // Remove all user-related info from localStorage
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Updated navLinks as per user request
  const navLinks = [
    { name: "Home", path: "/" },
    // Feature links only for logged in users
    ...(isLoggedIn ? [
      { name: "Flat Listings", path: "/flat-listings" },
      { name: "Find Flatmate", path: "/find-flatmate" },
      { name: "Report Listing", path: "/report-listing" },
      { name: "Booking Calendar", path: "/booking-calendar" },
      { name: "Rent Estimator", path: "/rent-estimator" },
    ] : [])
  ];

  return (
    <nav className="bg-white border-b border-yellow-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            {/* Replace src with your logo image if needed */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR5CsZKfa9KhTSO52Fl4ij3wUT1w4I6UbD3g&s" alt="Logo" className="h-8 w-8 mr-2" />
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-[#800020] bg-clip-text text-transparent">FlatScout</Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 hover:text-pink-600 font-medium px-2 py-1 rounded transition-colors duration-200${(location.pathname === link.path && link.name !== 'Home') ? (link.name === 'Find Flatmate' || link.name === 'Booking Calendar' ? ' bg-yellow-100 text-yellow-700' : ' bg-pink-100 text-pink-700') : ''}`}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                to="/login"
                className={`text-gray-700 hover:text-pink-600 font-medium px-2 py-1 rounded transition-colors duration-200 ${location.pathname === '/login' ? 'bg-pink-100 text-pink-700' : ''}`}
              >
                Login / Signup
              </Link>
            )}
            {/* Profile Dropdown (only when logged in) */}
            {isLoggedIn && (
              <div className="relative ml-4">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-pink-300"
                  />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-pink-100 rounded shadow-lg py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-yellow-50">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-yellow-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-gray-700 hover:text-pink-600 font-medium px-2 py-1 rounded transition-colors duration-200${(location.pathname === link.path && link.name !== 'Home') ? (link.name === 'Find Flatmate' || link.name === 'Booking Calendar' ? ' bg-yellow-100 text-yellow-700' : ' bg-pink-100 text-pink-700') : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                to="/login"
                className={`block text-gray-700 hover:text-pink-600 font-medium px-2 py-1 rounded transition-colors duration-200 ${location.pathname === '/login' ? 'bg-pink-100 text-pink-700' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Login / Signup
              </Link>
            )}
            {/* Profile Dropdown for mobile (only when logged in) */}
            {isLoggedIn && (
              <div className="mt-2 border-t pt-2">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-yellow-50">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-pink-50">Settings</Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
