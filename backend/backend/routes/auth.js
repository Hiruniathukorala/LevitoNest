const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

// Register a new designer
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(
      'INSERT INTO designers (name, email, password) VALUES (?, ?, ?)'
    );
    const result = stmt.run(name, email, hashedPassword);

    const token = jwt.sign(
      { id: result.lastInsertRowid, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Designer registered successfully',
      token,
      designer: { id: result.lastInsertRowid, name, email }
    });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const designer = db.prepare(
      'SELECT * FROM designers WHERE email = ?'
    ).get(email);

    if (!designer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = bcrypt.compareSync(password, designer.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: designer.id, email: designer.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      designer: {
        id: designer.id,
        name: designer.name,
        email: designer.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current designer
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const designer = db.prepare(
      'SELECT id, name, email, created_at FROM designers WHERE id = ?'
    ).get(decoded.id);

    if (!designer) {
      return res.status(404).json({ error: 'Designer not found' });
    }

    res.json({ designer });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;