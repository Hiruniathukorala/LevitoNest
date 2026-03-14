import React from 'react';
import { motion } from 'framer-motion';
import { Sofa, Monitor, PaintBucket, Lamp, Layers, Settings2, ZoomIn, Download } from 'lucide-react';

const DesignerTool = () => {
  return (
    <section className="py-24 bg-secondary bg-opacity-30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-darkText mb-4">Design Planner Concept</h2>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">Experience our interactive platform for layout planning.</p>
        </div>
        
        <div className="bg-white rounded-[40px] shadow-sm hover:shadow-soft transition-shadow duration-500 overflow-hidden lg:h-[700px] flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-24 bg-gray-50 flex lg:flex-col items-center py-8 gap-8 border-r border-gray-100 overflow-x-auto">
            <button className="p-4 bg-white text-primary rounded-[20px] shadow-sm hover:scale-110 transition-transform duration-300"><Layers size={24} /></button>
            <button className="p-4 text-gray-400 hover:text-primary hover:bg-white rounded-[20px] transition-all duration-300"><Sofa size={24} /></button>
            <button className="p-4 text-gray-400 hover:text-primary hover:bg-white rounded-[20px] transition-all duration-300"><Lamp size={24} /></button>
            <button className="p-4 text-gray-400 hover:text-primary hover:bg-white rounded-[20px] transition-all duration-300"><Monitor size={24} /></button>
          </div>

          {/* Center Canvas */}
          <div className="flex-1 relative bg-[#F8F9FA] p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair font-bold text-2xl text-darkText">Living Room Canvas</h3>
              <div className="flex gap-4">
                <button className="p-3 bg-white text-gray-600 rounded-full shadow-sm hover:text-primary transition-colors"><ZoomIn size={18} /></button>
                <button className="p-3 bg-white text-gray-600 rounded-full shadow-sm hover:text-primary transition-colors"><Download size={18} /></button>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-[32px] shadow-sm relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="Room Canvas" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Highlight Mock Elements */}
              <motion.div 
                className="absolute top-1/2 left-1/3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg animate-pulse backdrop-blur-sm"
                whileHover={{ scale: 1.2 }}
              >
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg animate-pulse backdrop-blur-sm"
                whileHover={{ scale: 1.2 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-4 h-4 bg-accent rounded-full"></div>
              </motion.div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-96 bg-white p-10 border-l border-gray-100 flex flex-col">
            <div className="mb-10">
              <h4 className="flex items-center gap-3 font-poppins font-semibold text-gray-800 text-lg mb-6"><Settings2 size={20} className="text-primary"/> Options</h4>
              <div className="space-y-4">
                <div className="p-5 rounded-[24px] bg-gray-50 hover:bg-secondary/40 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                  <h5 className="font-medium text-sm mb-2 text-gray-700">Color Palette</h5>
                  <div className="flex gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-[#2F6F5E] shadow-inner hover:scale-110 transition-transform"></div>
                    <div className="w-8 h-8 rounded-full bg-[#F5F3EF] shadow-inner ring-1 ring-gray-200 hover:scale-110 transition-transform"></div>
                    <div className="w-8 h-8 rounded-full bg-[#C6A769] shadow-inner hover:scale-110 transition-transform"></div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-500 bg-white hover:bg-gray-50 transition-colors">+</div>
                  </div>
                </div>
                <div className="p-5 rounded-[24px] bg-gray-50 hover:bg-secondary/40 transition-colors cursor-pointer border border-transparent hover:border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PaintBucket size={18} className="text-gray-500" />
                    <span className="font-medium text-sm text-gray-700">Material Finish</span>
                  </div>
                  <span className="text-sm font-medium text-accent">Matte</span>
                </div>
                <div className="p-5 rounded-[24px] bg-gray-50 hover:bg-secondary/40 transition-colors cursor-pointer border border-transparent hover:border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lamp size={18} className="text-gray-500" />
                    <span className="font-medium text-sm text-gray-700">Lighting</span>
                  </div>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Warm</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-8 border-t border-gray-50">
              <button className="w-full py-5 bg-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-primary/20">
                Start Designing
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DesignerTool;
