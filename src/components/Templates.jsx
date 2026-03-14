import React from 'react';
import { motion } from 'framer-motion';
import modernLivingRoomImg from '../assets/modern_living_room.jpg';
import luxuryKitchenImg from '../assets/luxury_kitchen.jpg';

const templates = [
  { id: 1, title: 'Modern Living Room', src: modernLivingRoomImg },
  { id: 2, title: 'Scandinavian Bedroom', src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Minimal Workspace', src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Luxury Kitchen', src: luxuryKitchenImg }
];

const Templates = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-darkText mb-4">Room Templates</h2>
            <p className="text-lg text-gray-500 font-poppins">Ready-made layouts for your unique space.</p>
          </div>
          <button className="text-primary font-medium border-b-2 border-primary pb-1 hover:text-darkText hover:border-darkText transition-colors duration-300">
            View All Templates
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((tpl, index) => (
            <motion.div 
              key={tpl.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-[32px] aspect-[4/5] mb-6 shadow-soft">
                <img 
                  src={tpl.src} 
                  alt={tpl.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-darkText px-8 py-4 rounded-full font-medium transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white shadow-xl">
                    Use Template
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-darkText text-center group-hover:text-primary transition-colors duration-300">{tpl.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
