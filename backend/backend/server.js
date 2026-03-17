const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware - allow all localhost ports
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Database (initializes on startup)
require('./database');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/furniture', require('./routes/furniture'));
app.use('/api/designs', require('./routes/designs'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'LevitoNest API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});