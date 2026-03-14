import React from 'react';
import { motion } from 'framer-motion';
import livingRoomImg from '../assets/living_room.jpg';
import kitchenImg from '../assets/kitchen.jpg';

const images = [
  { id: 1, src: livingRoomImg, category: 'Living Room', className: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', category: 'Bedroom', className: 'md:col-span-1 md:row-span-1' },
  { id: 3, src: kitchenImg, category: 'Kitchen', className: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', category: 'Workspace', className: 'md:col-span-1 md:row-span-1' },
  { id: 5, src: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800', category: 'Minimal Interior', className: 'md:col-span-1 md:row-span-1' }
];

const Gallery = () => {
  return (
    <section className="py-24 bg-lightBg px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-darkText mb-4">Inspiration Gallery</h2>
          <p className="text-lg text-gray-500 font-poppins max-w-2xl mx-auto">Discover beautiful spaces designed with passion.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={img.id}
              className={`relative overflow-hidden rounded-[32px] group ${img.className} shadow-soft`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img 
                src={img.src} 
                alt={img.category} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-white font-poppins font-medium mb-3 text-lg drop-shadow-md">{img.category}</span>
                <button className="bg-white text-darkText px-6 py-3 rounded-full font-medium w-fit hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg">
                  View Design
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
