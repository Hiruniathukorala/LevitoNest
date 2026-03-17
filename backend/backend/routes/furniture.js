const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/auth');

// Get all furniture items
router.get('/', (req, res) => {
  try {
    const furniture = db.prepare(
      'SELECT * FROM furniture ORDER BY type, name'
    ).all();

    res.json({ furniture });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get furniture by type
router.get('/type/:type', (req, res) => {
  try {
    const furniture = db.prepare(
      'SELECT * FROM furniture WHERE type = ? ORDER BY name'
    ).all(req.params.type);

    res.json({ furniture });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single furniture item
router.get('/:id', (req, res) => {
  try {
    const item = db.prepare(
      'SELECT * FROM furniture WHERE id = ?'
    ).get(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Furniture item not found' });
    }

    res.json({ item });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new furniture item (admin/designer only)
router.post('/', authenticateToken, (req, res) => {
  const { name, type, default_width, default_height, color } = req.body;

  if (!name || !type || !default_width || !default_height) {
    return res.status(400).json({ error: 'Name, type, width and height are required' });
  }

  try {
    const stmt = db.prepare(
      'INSERT INTO furniture (name, type, default_width, default_height, color) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(
      name,
      type,
      default_width,
      default_height,
      color || '#8B4513'
    );

    const item = db.prepare(
      'SELECT * FROM furniture WHERE id = ?'
    ).get(result.lastInsertRowid);

    res.status(201).json({ message: 'Furniture item added successfully', item });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update furniture item
router.put('/:id', authenticateToken, (req, res) => {
  const { name, type, default_width, default_height, color } = req.body;

  try {
    const item = db.prepare(
      'SELECT * FROM furniture WHERE id = ?'
    ).get(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Furniture item not found' });
    }

    db.prepare(
      'UPDATE furniture SET name = ?, type = ?, default_width = ?, default_height = ?, color = ? WHERE id = ?'
    ).run(
      name || item.name,
      type || item.type,
      default_width || item.default_width,
      default_height || item.default_height,
      color || item.color,
      req.params.id
    );

    const updatedItem = db.prepare(
      'SELECT * FROM furniture WHERE id = ?'
    ).get(req.params.id);

    res.json({ message: 'Furniture item updated successfully', item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete furniture item
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const item = db.prepare(
      'SELECT * FROM furniture WHERE id = ?'
    ).get(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Furniture item not found' });
    }

    db.prepare('DELETE FROM furniture WHERE id = ?').run(req.params.id);

    res.json({ message: 'Furniture item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;