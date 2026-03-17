import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// Floor component
const Floor = ({ width, height, color }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[width / 50, height / 50]} />
      <meshStandardMaterial color={color || '#f5f5f0'} />
    </mesh>
  );
};

// Wall components
const Walls = ({ width, height, color }) => {
  const w = width / 50;
  const h = height / 50;
  const wallHeight = 3;
  const wallColor = color || '#e8e8e0';

  return (
    <>
      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -h / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, wallHeight, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-w / 2, wallHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, wallHeight, h]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      {/* Right wall */}
      <mesh position={[w / 2, wallHeight / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, wallHeight, h]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </>
  );
};

// Furniture item in 3D
const FurnitureItem3D = ({ item }) => {
  const meshRef = useRef();
  const w = item.width / 50;
  const d = item.height / 50;

  // Calculate height based on furniture type
  const getFurnitureHeight = (type) => {
    switch (type) {
      case 'seating': return 0.8;
      case 'table': return 0.75;
      case 'bed': return 0.5;
      case 'storage': return 1.8;
      case 'media': return 0.5;
      case 'workspace': return 0.75;
      default: return 0.7;
    }
  };

  const furnitureHeight = getFurnitureHeight(item.furniture?.type);

  // Convert 2D canvas position to 3D
  const roomWidth = (item.roomWidth || 500) / 50;
  const roomHeight = (item.roomHeight || 400) / 50;
  const x = (item.x / 50) - roomWidth / 2 + w / 2;
  const z = (item.y / 50) - roomHeight / 2 + d / 2;

  return (
    <mesh
      ref={meshRef}
      position={[x, furnitureHeight / 2, z]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[w, furnitureHeight, d]} />
      <meshStandardMaterial
        color={item.color || '#8B4513'}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

// Furniture label
const FurnitureLabel = ({ item }) => {
  const w = item.width / 50;
  const d = item.height / 50;
  const roomWidth = (item.roomWidth || 500) / 50;
  const roomHeight = (item.roomHeight || 400) / 50;
  const x = (item.x / 50) - roomWidth / 2 + w / 2;
  const z = (item.y / 50) - roomHeight / 2 + d / 2;

  const getFurnitureHeight = (type) => {
    switch (type) {
      case 'seating': return 0.8;
      case 'table': return 0.75;
      case 'bed': return 0.5;
      case 'storage': return 1.8;
      case 'media': return 0.5;
      case 'workspace': return 0.75;
      default: return 0.7;
    }
  };

  const furnitureHeight = getFurnitureHeight(item.furniture?.type);

  return null;
};

const Scene = ({ design, room }) => {
  const roomWidth = (room?.width || 500) / 50;
  const roomDepth = (room?.height || 400) / 50;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} />

      <Floor
        width={room?.width || 500}
        height={room?.height || 400}
        color={room?.color || '#f5f5f0'}
      />
      <Walls
        width={room?.width || 500}
        height={room?.height || 400}
      />

      {design?.items?.map((item, index) => (
        <FurnitureItem3D
          key={index}
          item={{
            ...item,
            roomWidth: room?.width || 500,
            roomHeight: room?.height || 400
          }}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <PerspectiveCamera
        makeDefault
        position={[roomWidth, 4, roomDepth + 2]}
        fov={60}
      />
    </>
  );
};

const View3D = ({ design, room, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="font-playfair font-bold text-xl text-darkText">
            3D View — {design?.name}
          </h2>
          <p className="text-gray-400 font-poppins text-xs mt-1">
            Drag to rotate • Scroll to zoom • Right-click to pan
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
        >
          Close 3D View
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1">
        <Canvas shadows>
          <Scene design={design} room={room} />
        </Canvas>
      </div>

      {/* Legend */}
      <div className="bg-white px-6 py-3 flex gap-6 items-center overflow-x-auto">
        {design?.items?.map((item, index) => (
          <div key={index} className="flex items-center gap-2 shrink-0">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color || '#8B4513' }}
            />
            <span className="font-poppins text-xs text-gray-600">
              {item.furniture?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View3D;