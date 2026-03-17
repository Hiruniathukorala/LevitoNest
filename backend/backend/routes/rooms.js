const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/auth');

// Get all rooms for logged in designer
router.get('/', authenticateToken, (req, res) => {
  try {
    const rooms = db.prepare(
      'SELECT * FROM rooms WHERE designer_id = ? ORDER BY created_at DESC'
    ).all(req.designer.id);

    res.json({ rooms });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single room
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const room = db.prepare(
      'SELECT * FROM rooms WHERE id = ? AND designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new room
router.post('/', authenticateToken, (req, res) => {
  const { name, width, height, shape, color } = req.body;

  if (!name || !width || !height) {
    return res.status(400).json({ error: 'Name, width and height are required' });
  }

  try {
    const stmt = db.prepare(
      'INSERT INTO rooms (designer_id, name, width, height, shape, color) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(
      req.designer.id,
      name,
      width,
      height,
      shape || 'rectangle',
      color || '#ffffff'
    );

    const room = db.prepare(
      'SELECT * FROM rooms WHERE id = ?'
    ).get(result.lastInsertRowid);

    res.status(201).json({ message: 'Room created successfully', room });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update room
router.put('/:id', authenticateToken, (req, res) => {
  const { name, width, height, shape, color } = req.body;

  try {
    const room = db.prepare(
      'SELECT * FROM rooms WHERE id = ? AND designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    db.prepare(
      'UPDATE rooms SET name = ?, width = ?, height = ?, shape = ?, color = ? WHERE id = ?'
    ).run(
      name || room.name,
      width || room.width,
      height || room.height,
      shape || room.shape,
      color || room.color,
      req.params.id
    );

    const updatedRoom = db.prepare(
      'SELECT * FROM rooms WHERE id = ?'
    ).get(req.params.id);

    res.json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete room
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const room = db.prepare(
      'SELECT * FROM rooms WHERE id = ? AND designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    db.prepare('DELETE FROM rooms WHERE id = ?').run(req.params.id);

    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;