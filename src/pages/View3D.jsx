import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const SCALE = 100;

const Floor = ({ width, height, color }) => {
  const w = width / SCALE;
  const h = height / SCALE;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial color={color || '#f5f5f0'} roughness={0.8} />
    </mesh>
  );
};

const Walls = ({ width, height }) => {
  const w = width / SCALE;
  const h = height / SCALE;
  const wallH = 2.5;
  const wallColor = '#e8e4dc';
  const thickness = 0.1;
  return (
    <>
      <mesh position={[0, wallH / 2, -h / 2]} receiveShadow castShadow>
        <boxGeometry args={[w + thickness, wallH, thickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      <mesh position={[-w / 2, wallH / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[thickness, wallH, h]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      <mesh position={[w / 2, wallH / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[thickness, wallH, h]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, -h / 2 + 0.05]}>
        <boxGeometry args={[w, 0.08, 0.05]} />
        <meshStandardMaterial color="#d0ccc4" />
      </mesh>
      <mesh position={[-w / 2 + 0.05, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.08, h]} />
        <meshStandardMaterial color="#d0ccc4" />
      </mesh>
      <mesh position={[w / 2 - 0.05, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.08, h]} />
        <meshStandardMaterial color="#d0ccc4" />
      </mesh>
    </>
  );
};

const FurnitureItem3D = ({ item }) => {
  const roomW = item.roomWidth || 500;
  const roomH = item.roomHeight || 400;

  // Fabric.js stores top-left corner position
  // We need center position in 3D space
  const itemW = item.width || 100;
  const itemD = item.height || 80;

  const w = itemW / SCALE;
  const d = itemD / SCALE;

  // Convert from canvas top-left to 3D center
  // Canvas: (0,0) = top-left, x goes right, y goes down
  // 3D: (0,0) = center of room, x goes right, z goes forward
  const centerX = (item.x || 0) + itemW / 2;
  const centerY = (item.y || 0) + itemD / 2;

const roomW3D = roomW / SCALE;
const roomH3D = roomH / SCALE;

const rawX = (centerX / roomW) * roomW3D - roomW3D / 2;
const rawZ = (centerY / roomH) * roomH3D - roomH3D / 2;

// Clamp inside room walls
const margin = 0.05;
const x = Math.max(-roomW3D / 2 + w / 2 + margin, Math.min(roomW3D / 2 - w / 2 - margin, rawX));
const z = Math.max(-roomH3D / 2 + d / 2 + margin, Math.min(roomH3D / 2 - d / 2 - margin, rawZ));

  const furnitureColor = item.color || '#8B6914';

  const getHeight = (type) => {
    switch (type) {
      case 'seating': return 0.8;
      case 'table': return 0.7;
      case 'bed': return 0.5;
      case 'storage': return 1.6;
      case 'media': return 0.4;
      case 'workspace': return 0.7;
      default: return 0.6;
    }
  };

  const furnitureH = getHeight(item.furniture?.type);
  const type = item.furniture?.type;

  if (type === 'seating') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.18, d * 0.65]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, -d * 0.28]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.5, d * 0.12]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.8} />
        </mesh>
        <mesh position={[-w / 2 + 0.07, 0.35, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, d * 0.65]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.8} />
        </mesh>
        <mesh position={[w / 2 - 0.07, 0.35, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, d * 0.65]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.8} />
        </mesh>
        {[[-w/2+0.1,-d/2+0.1],[w/2-0.1,-d/2+0.1],[-w/2+0.1,d/2-0.1],[w/2-0.1,d/2-0.1]].map((pos,i) => (
          <mesh key={i} position={[pos[0], 0.05, pos[1]]} castShadow>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === 'bed') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.25, d]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.35, 0.05]} castShadow>
          <boxGeometry args={[w - 0.08, 0.1, d - 0.15]} />
          <meshStandardMaterial color="#f0ede8" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.46, -d/2 + 0.2]} castShadow>
          <boxGeometry args={[w * 0.65, 0.07, 0.22]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.65, -d/2 + 0.05]} castShadow>
          <boxGeometry args={[w, 0.75, 0.08]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.7} />
        </mesh>
        {[[-w/2+0.1,-d/2+0.1],[w/2-0.1,-d/2+0.1],[-w/2+0.1,d/2-0.1],[w/2-0.1,d/2-0.1]].map((pos,i) => (
          <mesh key={i} position={[pos[0], 0.05, pos[1]]} castShadow>
            <boxGeometry args={[0.07, 0.1, 0.07]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === 'table') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, furnitureH, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.07, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.6} />
        </mesh>
        {[[-w/2+0.07,-d/2+0.07],[w/2-0.07,-d/2+0.07],[-w/2+0.07,d/2-0.07],[w/2-0.07,d/2-0.07]].map((pos,i) => (
          <mesh key={i} position={[pos[0], furnitureH / 2, pos[1]]} castShadow>
            <boxGeometry args={[0.06, furnitureH, 0.06]} />
            <meshStandardMaterial color={furnitureColor} roughness={0.7} />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === 'storage') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, furnitureH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, furnitureH, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, furnitureH / 2, d / 2 + 0.01]}>
          <boxGeometry args={[0.015, furnitureH - 0.08, 0.01]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {[-0.08, 0.08].map((hx, i) => (
          <mesh key={i} position={[hx, furnitureH / 2, d / 2 + 0.02]}>
            <boxGeometry args={[0.025, 0.025, 0.025]} />
            <meshStandardMaterial color="#c0a060" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === 'workspace') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, furnitureH, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, 0.06, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.6} />
        </mesh>
        <mesh position={[-w/2 + 0.05, furnitureH/2, 0]} castShadow>
          <boxGeometry args={[0.05, furnitureH, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.7} />
        </mesh>
        <mesh position={[w/2 - 0.05, furnitureH/2, 0]} castShadow>
          <boxGeometry args={[0.05, furnitureH, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.7} />
        </mesh>
      </group>
    );
  }

  if (type === 'media') {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, furnitureH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, furnitureH, d]} />
          <meshStandardMaterial color={furnitureColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, furnitureH + 0.5, -d/2 + 0.02]}>
          <boxGeometry args={[w * 0.85, 0.6, 0.04]} />
          <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.5} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={[x, furnitureH / 2, z]} castShadow receiveShadow>
      <boxGeometry args={[w, furnitureH, d]} />
      <meshStandardMaterial color={furnitureColor} roughness={0.7} />
    </mesh>
  );
};

const Scene = ({ design, room }) => {
  const roomW = (room?.width || 500) / SCALE;
  const roomD = (room?.height || 400) / SCALE;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[roomW, 8, roomD]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[0, 2.5, 0]} intensity={0.4} color="#fff5e0" />
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
      <PerspectiveCamera
        makeDefault
        position={[roomW * 0.6, roomD * 0.8, roomD * 1.5]}
        fov={55}
      />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={1}
        maxDistance={30}
      />
    </>
  );
};

const View3D = ({ design, room, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col">
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
      <div className="flex-1">
        <Canvas shadows gl={{ antialias: true }}>
          <color attach="background" args={['#d4e8f5']} />
          <fog attach="fog" args={['#d4e8f5', 20, 60]} />
          <Scene design={design} room={room} />
        </Canvas>
      </div>
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