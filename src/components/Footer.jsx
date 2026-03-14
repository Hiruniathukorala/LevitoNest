import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { Logo } from './Navbar';

const Footer = () => {
  return (
    <footer className="bg-[#111820] text-white pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 scale-125 origin-left invert brightness-200">
              <Logo />
            </div>
            <p className="text-gray-400 font-poppins font-light leading-relaxed max-w-sm">
              Helping you design your dream home with beautiful interior inspiration, ready-made templates, and intuitive planning tools.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 font-poppins font-light text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Navigation Links</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-playfair font-semibold mb-6">Connect</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E60023] transition-colors text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.372 0 12C0 17.084 3.16 21.42 7.627 23.174C7.627 22.227 7.615 20.65 7.643 19.596C4.305 20.321 3.6 17.988 3.6 17.988C3.054 16.602 2.268 16.233 2.268 16.233C1.18 15.489 2.35 15.504 2.35 15.504C3.553 15.588 4.185 16.74 4.185 16.74C5.253 18.57 6.98 18.041 7.666 17.734C7.776 16.953 8.088 16.424 8.432 16.124C5.772 15.82 2.977 14.792 2.977 10.375C2.977 9.116 3.428 8.084 4.172 7.275C4.053 6.973 3.655 5.798 4.286 4.215C4.286 4.215 5.26 3.903 7.625 5.507C8.55 5.25 9.55 5.122 10.54 5.117C11.53 5.122 12.531 5.25 13.458 5.507C15.822 3.903 16.794 4.215 16.794 4.215C17.426 5.798 17.028 6.973 16.91 7.275C17.656 8.084 18.106 9.116 18.106 10.375C18.106 14.805 15.305 15.815 12.636 16.111C13.067 16.483 13.454 17.218 13.454 18.349C13.454 19.967 13.439 21.272 13.439 21.666C13.439 22.064 13.722 22.536 14.536 22.385C19.165 20.763 22.5 16.284 22.5 12C22.5 5.372 17.127 0 12 0Z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="font-poppins text-sm text-gray-500">Subscribe for inspiration</p>
            <div className="mt-4 flex">
              <input type="email" placeholder="Email Address" className="bg-gray-800 text-white px-4 py-3 rounded-l-full outline-none w-full border-none focus:ring-1 focus:ring-primary text-sm font-light" />
              <button className="bg-primary px-5 py-3 rounded-r-full text-sm font-medium hover:bg-opacity-90 transition-opacity">OK</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-poppins text-gray-600 font-light">
          <p>&copy; 2026 LevitoNest. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
