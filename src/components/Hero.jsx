import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 drop-shadow-xl relative inline-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Levito<span className="text-secondary">Nest</span>
          <motion.div 
            className="absolute -top-6 -right-8 w-12 h-12 border-2 border-secondary/30 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-secondary mb-10 font-poppins font-light drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Design Your Dream Home with Beautiful Interior Inspiration
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-soft">
            Explore Designs
          </button>
          <button className="px-8 py-4 bg-white text-darkText rounded-full font-medium hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-soft">
            Start Planning
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
