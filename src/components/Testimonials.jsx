import React from 'react';
import { motion } from 'framer-motion';
import userHiruni from '../assets/user_hiruni.jpg';
import userSanchitha from '../assets/user_sanchitha.jpg';
import userDimuth from '../assets/user_dimuth.jpg';

const testimonials = [
  {
    text: "LevitoNest helped me redesign my living room beautifully. The templates were a lifesaver!",
    name: "Hiruni Athukorala",
    role: "Homeowner",
    img: userHiruni
  },
  {
    text: "Great inspiration for modern interiors. I love the minimalist design aesthetic they offer.",
    name: "Sanchitha Arampath",
    role: "Interior Enthusiast",
    img: userSanchitha
  },
  {
    text: "Simple and elegant design platform. The planner feature is exactly what I was looking for.",
    name: "Dimuth Fonseka",
    role: "Architect",
    img: userDimuth
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-darkText mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-500 font-poppins max-w-2xl mx-auto">Join thousands of people designing their dream homes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div 
              key={index}
              className="bg-lightBg p-10 rounded-[32px] border border-gray-100 hover:shadow-soft transition-shadow duration-300 relative flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-accent mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-lg text-gray-700 font-poppins font-light leading-relaxed mb-8 flex-grow">
                "{test.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-white">
                  <img src={test.img} alt={test.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-darkText">{test.name}</h4>
                  <p className="text-sm text-gray-500 font-poppins">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
