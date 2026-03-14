import React from 'react';
import { motion } from 'framer-motion';
import { Image, LayoutTemplate, PenTool, Heart } from 'lucide-react';

const featuresData = [
  {
    icon: <Image size={32} className="text-primary mb-4" />,
    title: "Interior Inspiration",
    description: "Browse curated living room, bedroom, and kitchen designs."
  },
  {
    icon: <LayoutTemplate size={32} className="text-primary mb-4" />,
    title: "Room Templates",
    description: "Explore ready-made room layouts tailored for your space."
  },
  {
    icon: <PenTool size={32} className="text-primary mb-4" />,
    title: "Design Planner",
    description: "Plan your home layout visually with our intuitive tools."
  },
  {
    icon: <Heart size={32} className="text-primary mb-4" />,
    title: "Save Favorites",
    description: "Save your favorite designs to access them anytime."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-darkText mb-4">Discover Our Features</h2>
          <p className="text-lg text-gray-500 font-poppins max-w-2xl mx-auto">Everything you need to transform your space into a masterpiece.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-secondary bg-opacity-40 p-8 rounded-[32px] hover:bg-white hover:shadow-soft transition-all duration-300 border border-transparent hover:border-gray-100 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3 text-darkText">{feature.title}</h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
