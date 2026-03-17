import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDesigns, getRooms, deleteDesign, deleteRoom } from '../api';
import { Logo } from '../components/Navbar';
import Designer from './Designer';

const Dashboard = ({ designer, onLogout }) => {
  const [designs, setDesigns] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('designs');
  const [showDesigner, setShowDesigner] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [designsRes, roomsRes] = await Promise.all([
        getDesigns(),
        getRooms()
      ]);
      setDesigns(designsRes.data.designs);
      setRooms(roomsRes.data.rooms);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Delete this design?')) return;
    try {
      await deleteDesign(id);
      setDesigns(designs.filter(d => d.id !== id));
    } catch (err) {
      console.error('Error deleting design:', err);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await deleteRoom(id);
      setRooms(rooms.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting room:', err);
    }
  };

  const handleOpenDesigner = (design = null) => {
    setSelectedDesign(design);
    setShowDesigner(true);
  };

  const handleCloseDesigner = () => {
    setShowDesigner(false);
    setSelectedDesign(null);
    fetchData();
  };

  if (showDesigner) {
    return (
      <Designer
        designer={designer}
        existingDesign={selectedDesign}
        rooms={rooms}
        onClose={handleCloseDesigner}
        onRoomsUpdate={fetchData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-lightBg">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="font-poppins text-gray-600 text-sm">
            Welcome, <span className="text-primary font-medium">{designer?.name}</span>
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-gray-200 rounded-full text-sm font-poppins hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-darkText">
            My Dashboard
          </h2>
          <button
            onClick={() => handleOpenDesigner()}
            className="px-6 py-3 bg-primary text-white rounded-full font-poppins font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-soft"
          >
            + New Design
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('designs')}
            className={`px-6 py-2.5 rounded-full font-poppins text-sm font-medium transition-all duration-300 ${activeTab === 'designs' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            My Designs ({designs.length})
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-2.5 rounded-full font-poppins text-sm font-medium transition-all duration-300 ${activeTab === 'rooms' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            My Rooms ({rooms.length})
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-poppins">Loading...</p>
          </div>
        )}

        {/* Designs Tab */}
        {!loading && activeTab === 'designs' && (
          <div>
            {designs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px]">
                <p className="text-gray-400 font-poppins mb-4">No designs yet</p>
                <button
                  onClick={() => handleOpenDesigner()}
                  className="px-6 py-3 bg-primary text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
                >
                  Create your first design
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design, index) => (
                  <motion.div
                    key={design.id}
                    className="bg-white rounded-[24px] p-6 shadow-soft hover:shadow-md transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair font-bold text-darkText text-lg">
                          {design.name}
                        </h3>
                        <p className="text-gray-500 font-poppins text-sm mt-1">
                          Room: {design.room_name}
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border border-gray-200"
                        style={{ backgroundColor: design.room_color || '#ffffff' }}
                      />
                    </div>
                    <p className="text-gray-400 font-poppins text-xs mb-4">
                      {design.items?.length || 0} furniture items
                    </p>
                    <p className="text-gray-300 font-poppins text-xs mb-4">
                      Updated: {new Date(design.updated_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDesigner(design)}
                        className="flex-1 py-2 bg-primary text-white rounded-full text-sm font-poppins hover:bg-opacity-90 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDesign(design.id)}
                        className="flex-1 py-2 border border-red-200 text-red-500 rounded-full text-sm font-poppins hover:bg-red-50 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rooms Tab */}
        {!loading && activeTab === 'rooms' && (
          <div>
            {rooms.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px]">
                <p className="text-gray-400 font-poppins mb-4">No rooms yet</p>
                <button
                  onClick={() => handleOpenDesigner()}
                  className="px-6 py-3 bg-primary text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
                >
                  Create a design to add rooms
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    className="bg-white rounded-[24px] p-6 shadow-soft hover:shadow-md transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-playfair font-bold text-darkText text-lg">
                        {room.name}
                      </h3>
                      <div
                        className="w-8 h-8 rounded-full border border-gray-200"
                        style={{ backgroundColor: room.color || '#ffffff' }}
                      />
                    </div>
                    <p className="text-gray-500 font-poppins text-sm">
                      Size: {room.width} x {room.height} cm
                    </p>
                    <p className="text-gray-500 font-poppins text-sm mt-1">
                      Shape: {room.shape}
                    </p>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="w-full mt-4 py-2 border border-red-200 text-red-500 rounded-full text-sm font-poppins hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;