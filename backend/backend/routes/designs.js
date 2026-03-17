const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/auth');

// Get all designs for logged in designer
router.get('/', authenticateToken, (req, res) => {
  try {
    const designs = db.prepare(
      'SELECT d.*, r.name as room_name, r.width as room_width, r.height as room_height, r.color as room_color FROM designs d JOIN rooms r ON d.room_id = r.id WHERE d.designer_id = ? ORDER BY d.updated_at DESC'
    ).all(req.designer.id);

    // Parse items JSON for each design
    const parsedDesigns = designs.map(design => ({
      ...design,
      items: JSON.parse(design.items || '[]')
    }));

    res.json({ designs: parsedDesigns });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single design
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const design = db.prepare(
      'SELECT d.*, r.name as room_name, r.width as room_width, r.height as room_height, r.color as room_color FROM designs d JOIN rooms r ON d.room_id = r.id WHERE d.id = ? AND d.designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.json({
      design: {
        ...design,
        items: JSON.parse(design.items || '[]')
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new design
router.post('/', authenticateToken, (req, res) => {
  const { room_id, name, items } = req.body;

  if (!room_id || !name) {
    return res.status(400).json({ error: 'Room and design name are required' });
  }

  try {
    // Check room belongs to this designer
    const room = db.prepare(
      'SELECT * FROM rooms WHERE id = ? AND designer_id = ?'
    ).get(room_id, req.designer.id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const stmt = db.prepare(
      'INSERT INTO designs (designer_id, room_id, name, items) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(
      req.designer.id,
      room_id,
      name,
      JSON.stringify(items || [])
    );

    const design = db.prepare(
      'SELECT * FROM designs WHERE id = ?'
    ).get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Design created successfully',
      design: {
        ...design,
        items: JSON.parse(design.items || '[]')
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update design (save canvas state)
router.put('/:id', authenticateToken, (req, res) => {
  const { name, items } = req.body;

  try {
    const design = db.prepare(
      'SELECT * FROM designs WHERE id = ? AND designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    db.prepare(
      'UPDATE designs SET name = ?, items = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(
      name || design.name,
      JSON.stringify(items || JSON.parse(design.items)),
      req.params.id
    );

    const updatedDesign = db.prepare(
      'SELECT * FROM designs WHERE id = ?'
    ).get(req.params.id);

    res.json({
      message: 'Design saved successfully',
      design: {
        ...updatedDesign,
        items: JSON.parse(updatedDesign.items || '[]')
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete design
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const design = db.prepare(
      'SELECT * FROM designs WHERE id = ? AND designer_id = ?'
    ).get(req.params.id, req.designer.id);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    db.prepare('DELETE FROM designs WHERE id = ?').run(req.params.id);

    res.json({ message: 'Design deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;