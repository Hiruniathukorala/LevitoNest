import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 bg-primary rounded-2xl opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:rotate-12"
      />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary relative z-10 filter drop-shadow-sm">
        <path d="M3 9.5L12 3L21 9.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7.5" r="1.5" fill="currentColor" className="animate-pulse" />
      </svg>
    </div>
    <span className="text-2xl font-playfair font-bold text-darkText tracking-tight group-hover:text-primary transition-colors duration-300">
      Levito<span className="text-primary ml-0.5">Nest</span>
    </span>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Templates', href: '#templates' },
    { name: 'Testimonials', href: '#testimonials' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-soft' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`font-poppins text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-darkText hover:text-primary' : 'text-white hover:text-secondary'}`}
            >
              {link.name}
            </a>
          ))}
          <button className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${isScrolled ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-opacity-90' : 'bg-white text-darkText hover:bg-secondary'}`}>
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-darkText font-medium text-lg border-b border-gray-50 pb-2 active:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-primary text-white py-3 rounded-xl font-medium mt-4">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
export { Logo };
