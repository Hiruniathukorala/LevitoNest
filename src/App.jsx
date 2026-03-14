import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Templates from './components/Templates';
import DesignerTool from './components/DesignerTool';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-lightBg text-darkText">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Templates />
      <DesignerTool />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
