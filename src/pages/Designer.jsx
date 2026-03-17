import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { HexColorPicker } from 'react-colorful';
import { getFurniture, createRoom, createDesign, updateDesign } from '../api';
import View3D from './View3D';

const Designer = ({ designer, existingDesign, rooms, onClose, onRoomsUpdate }) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [furniture, setFurniture] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#8B4513');
  const [designName, setDesignName] = useState(existingDesign?.name || 'New Design');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [activeTab, setActiveTab] = useState('furniture');
  const [showRoomSetup, setShowRoomSetup] = useState(!existingDesign);
  const [roomData, setRoomData] = useState({
    name: '',
    width: 500,
    height: 400,
    shape: 'rectangle',
    color: '#f5f5f0'
  });
  const [currentRoom, setCurrentRoom] = useState(
    existingDesign ? {
      id: existingDesign.room_id,
      width: existingDesign.room_width,
      height: existingDesign.room_height,
      color: existingDesign.room_color
    } : null
  );

  useEffect(() => {
    loadFurniture();
  }, []);

  useEffect(() => {
    if (!showRoomSetup && canvasRef.current) {
      initCanvas();
    }
    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, [showRoomSetup]);

  const loadFurniture = async () => {
    try {
      const res = await getFurniture();
      setFurniture(res.data.furniture);
    } catch (err) {
      console.error('Error loading furniture:', err);
    }
  };

  const initCanvas = () => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: currentRoom?.width || 600,
      height: currentRoom?.height || 500,
      backgroundColor: currentRoom?.color || '#f5f5f0',
    });

    fabricRef.current = canvas;
    drawGrid(canvas);

    if (existingDesign?.items?.length > 0) {
      existingDesign.items.forEach(item => {
        addFurnitureToCanvas(item.furniture, item.x, item.y, item.width, item.height, item.color, item.angle);
      });
    }

    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected[0]);
      setCurrentColor(e.selected[0].fill || '#8B4513');
    });
    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected[0]);
      setCurrentColor(e.selected[0].fill || '#8B4513');
    });
    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setShowColorPicker(false);
    });
  };

  const drawGrid = (canvas) => {
    const gridSize = 20;
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < width / gridSize; i++) {
      canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, height], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
      }));
    }
    for (let i = 0; i < height / gridSize; i++) {
      canvas.add(new fabric.Line([0, i * gridSize, width, i * gridSize], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
      }));
    }
  };

  const addFurnitureToCanvas = (item, x, y, w, h, color, angle = 0) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const width = w || item.default_width;
    const height = h || item.default_height;
    const fillColor = color || item.color || '#8B4513';

    const rect = new fabric.Rect({
      left: x || Math.random() * (canvas.width - width),
      top: y || Math.random() * (canvas.height - height),
      width: width,
      height: height,
      fill: fillColor,
      stroke: '#333',
      strokeWidth: 1.5,
      rx: 6,
      ry: 6,
      angle: angle || 0,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.2)',
        blur: 8,
        offsetX: 2,
        offsetY: 2
      })
    });

    const text = new fabric.Text(item.name, {
      fontSize: 11,
      fill: '#ffffff',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      selectable: false,
      evented: false,
    });

    const group = new fabric.Group([rect, text], {
      left: x || rect.left,
      top: y || rect.top,
      angle: angle || 0,
    });

    text.set({
      left: rect.width / 2 - text.width / 2,
      top: rect.height / 2 - text.height / 2,
    });

    group.furnitureData = item;
    canvas.add(group);
    canvas.renderAll();
  };

  const handleAddFurniture = (item) => {
    addFurnitureToCanvas(item);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
    if (selectedObject && fabricRef.current) {
      if (selectedObject.type === 'group') {
        const rect = selectedObject.getObjects()[0];
        rect.set('fill', color);
      } else {
        selectedObject.set('fill', color);
      }
      fabricRef.current.renderAll();
    }
  };

  const handleRoomColorChange = (color) => {
    setRoomData({ ...roomData, color });
    if (fabricRef.current) {
      fabricRef.current.setBackgroundColor(color, fabricRef.current.renderAll.bind(fabricRef.current));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedObject && fabricRef.current) {
      fabricRef.current.remove(selectedObject);
      setSelectedObject(null);
      fabricRef.current.renderAll();
    }
  };

  const handleRotate = () => {
    if (selectedObject && fabricRef.current) {
      selectedObject.set('angle', (selectedObject.angle + 90) % 360);
      fabricRef.current.renderAll();
    }
  };

  const handleApplyShading = () => {
    if (selectedObject && fabricRef.current) {
      const objects = selectedObject.type === 'group'
        ? selectedObject.getObjects()
        : [selectedObject];
      objects.forEach(obj => {
        if (obj.type === 'rect') {
          obj.set('shadow', new fabric.Shadow({
            color: 'rgba(0,0,0,0.5)',
            blur: 20,
            offsetX: 5,
            offsetY: 5
          }));
        }
      });
      fabricRef.current.renderAll();
    }
  };

  const handleRemoveShading = () => {
    if (selectedObject && fabricRef.current) {
      const objects = selectedObject.type === 'group'
        ? selectedObject.getObjects()
        : [selectedObject];
      objects.forEach(obj => {
        obj.set('shadow', null);
      });
      fabricRef.current.renderAll();
    }
  };

  const getCanvasItems = () => {
    if (!fabricRef.current) return [];
    return fabricRef.current.getObjects()
      .filter(obj => obj.type === 'group' && obj.furnitureData)
      .map(obj => ({
        furniture: obj.furnitureData,
        x: obj.left,
        y: obj.top,
        width: obj.width,
        height: obj.height,
        color: obj.getObjects()[0]?.fill,
        angle: obj.angle
      }));
  };

  const handleCreateRoom = async () => {
    if (!roomData.name) {
      alert('Please enter a room name');
      return;
    }
    try {
      const res = await createRoom(roomData);
      setCurrentRoom(res.data.room);
      setShowRoomSetup(false);
      onRoomsUpdate();
    } catch (err) {
      alert('Error creating room');
    }
  };

  const handleSaveDesign = async () => {
    setSaving(true);
    try {
      const items = getCanvasItems();
      if (existingDesign) {
        await updateDesign(existingDesign.id, { name: designName, items });
      } else {
        await createDesign({
          room_id: currentRoom.id,
          name: designName,
          items
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error saving design');
    } finally {
      setSaving(false);
    }
  };

  const furnitureByType = furniture.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // 3D View
  if (show3D) {
    return (
      <View3D
        design={{ name: designName, items: getCanvasItems() }}
        room={currentRoom}
        onClose={() => setShow3D(false)}
      />
    );
  }

  // Room Setup Screen
  if (showRoomSetup) {
    return (
      <div className="min-h-screen bg-lightBg flex items-center justify-center px-4">
        <div className="bg-white rounded-[32px] shadow-soft p-10 w-full max-w-lg">
          <h2 className="text-3xl font-playfair font-bold text-darkText mb-2">
            Set Up Your Room
          </h2>
          <p className="text-gray-500 font-poppins text-sm mb-8">
            Enter the room specifications to start designing
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                Room Name
              </label>
              <input
                type="text"
                value={roomData.name}
                onChange={e => setRoomData({ ...roomData, name: e.target.value })}
                placeholder="e.g. Living Room"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  value={roomData.width}
                  onChange={e => setRoomData({ ...roomData, width: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={roomData.height}
                  onChange={e => setRoomData({ ...roomData, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                Room Shape
              </label>
              <select
                value={roomData.shape}
                onChange={e => setRoomData({ ...roomData, shape: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary font-poppins text-sm"
              >
                <option value="rectangle">Rectangle</option>
                <option value="square">Square</option>
                <option value="l-shape">L-Shape</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 font-poppins mb-2">
                Room Colour
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer"
                  style={{ backgroundColor: roomData.color }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                <span className="font-poppins text-sm text-gray-500">{roomData.color}</span>
              </div>
              {showColorPicker && (
                <div className="mt-3">
                  <HexColorPicker
                    color={roomData.color}
                    onChange={color => setRoomData({ ...roomData, color })}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-full font-poppins text-sm hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRoom}
              className="flex-1 py-3 bg-primary text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
            >
              Start Designing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Designer
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary transition-colors font-poppins text-sm"
          >
            ← Back
          </button>
          <input
            type="text"
            value={designName}
            onChange={e => setDesignName(e.target.value)}
            className="font-playfair font-bold text-xl text-darkText border-none outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-green-500 font-poppins text-sm">
              ✓ Saved!
            </span>
          )}
          <button
            onClick={() => setShow3D(true)}
            className="px-6 py-2 bg-darkText text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
          >
            View in 3D
          </button>
          <button
            onClick={handleSaveDesign}
            disabled={saving}
            className="px-6 py-2 bg-primary text-white rounded-full font-poppins text-sm hover:bg-opacity-90 transition-all"
          >
            {saving ? 'Saving...' : 'Save Design'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-64 bg-white shadow-sm flex flex-col overflow-y-auto">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('furniture')}
              className={`flex-1 py-3 text-xs font-poppins font-medium transition-colors ${activeTab === 'furniture' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            >
              Furniture
            </button>
            <button
              onClick={() => setActiveTab('room')}
              className={`flex-1 py-3 text-xs font-poppins font-medium transition-colors ${activeTab === 'room' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            >
              Room
            </button>
          </div>

          {activeTab === 'furniture' && (
            <div className="p-3 space-y-4">
              {Object.entries(furnitureByType).map(([type, items]) => (
                <div key={type}>
                  <h4 className="text-xs font-poppins font-semibold text-gray-400 uppercase mb-2">
                    {type}
                  </h4>
                  <div className="space-y-1">
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleAddFurniture(item)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 font-poppins text-sm text-gray-700 flex items-center justify-between group"
                      >
                        <span>{item.name}</span>
                        <span className="text-xs text-gray-400 group-hover:text-white">
                          {item.default_width}×{item.default_height}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'room' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-poppins font-medium text-gray-500 mb-2">
                  Room Colour
                </label>
                <HexColorPicker
                  color={currentRoom?.color || '#f5f5f0'}
                  onChange={handleRoomColorChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <div className="shadow-xl rounded-lg overflow-hidden">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-56 bg-white shadow-sm p-4 flex flex-col gap-4">
          <h3 className="font-poppins font-semibold text-gray-700 text-sm">
            Selected Item
          </h3>
          {selectedObject ? (
            <>
              <div>
                <label className="block text-xs font-poppins text-gray-400 mb-2">
                  Colour
                </label>
                <div
                  className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer"
                  style={{ backgroundColor: currentColor }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                {showColorPicker && (
                  <div className="mt-2">
                    <HexColorPicker
                      color={currentColor}
                      onChange={handleColorChange}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleRotate}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-poppins text-sm hover:bg-gray-200 transition-all"
              >
                Rotate 90°
              </button>
              <button
                onClick={handleApplyShading}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-poppins text-sm hover:bg-gray-200 transition-all"
              >
                Apply Shading
              </button>
              <button
                onClick={handleRemoveShading}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-poppins text-sm hover:bg-gray-200 transition-all"
              >
                Remove Shading
              </button>
              <button
                onClick={handleDeleteSelected}
                className="w-full py-2 bg-red-50 text-red-500 rounded-xl font-poppins text-sm hover:bg-red-100 transition-all"
              >
                Delete Item
              </button>
            </>
          ) : (
            <p className="text-gray-400 font-poppins text-xs">
              Click a furniture item on the canvas to edit it
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Designer;