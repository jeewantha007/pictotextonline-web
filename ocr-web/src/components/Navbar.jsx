import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a href="#main-content" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
          Skip to main content
        </a>
        <a href="#footer" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">
          Skip to footer
        </a>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMenu}
              aria-label="Go to homepage"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-blue-600`}>
                PicToTextOnline
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === '/' 
                    ? 'text-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === '/about' 
                    ? 'text-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === '/contact' 
                    ? 'text-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/grammar-checker" 
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === '/grammar-checker' 
                    ? 'text-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                Grammar Checker
              </Link>
              <Link 
                to="/words-counter" 
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === '/words-counter' 
                    ? 'text-blue-600' 
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                Word Counter
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white shadow-lg border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/about' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/contact' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/grammar-checker" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/grammar-checker' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeMenu}
              >
                Grammar Checker
              </Link>
              <Link 
                to="/words-counter" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/words-counter' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeMenu}
              >
                Word Counter
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
