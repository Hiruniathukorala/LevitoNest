import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Templates from './components/Templates';
import DesignerTool from './components/DesignerTool';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [designer, setDesigner] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const stored = localStorage.getItem('designer');
    const token = localStorage.getItem('token');
    if (stored && token) {
      setDesigner(JSON.parse(stored));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (designerData) => {
    setDesigner(designerData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('designer');
    setDesigner(null);
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (currentPage === 'dashboard' && designer) {
    return (
      <Dashboard
        designer={designer}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-lightBg text-darkText">
      <Navbar onGetStarted={() => setCurrentPage('login')} />
      <Hero onExplore={() => setCurrentPage('login')} />
      <Features />
      <Gallery />
      <Templates />
      <DesignerTool onStart={() => setCurrentPage('login')} />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;