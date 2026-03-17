const Database = require('better-sqlite3');
const db = new Database('levitonest.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS designers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    designer_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    shape TEXT DEFAULT 'rectangle',
    color TEXT DEFAULT '#ffffff',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES designers(id)
  );

  CREATE TABLE IF NOT EXISTS furniture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    default_width REAL NOT NULL,
    default_height REAL NOT NULL,
    color TEXT DEFAULT '#8B4513'
  );

  CREATE TABLE IF NOT EXISTS designs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    designer_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    items TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES designers(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  );
`);

// Add default furniture items if table is empty
const count = db.prepare('SELECT COUNT(*) as c FROM furniture').get();
if (count.c === 0) {
  const insert = db.prepare(
    'INSERT INTO furniture (name, type, default_width, default_height, color) VALUES (?, ?, ?, ?, ?)'
  );
  insert.run('Sofa', 'seating', 120, 60, '#8B6914');
  insert.run('Armchair', 'seating', 60, 60, '#8B6914');
  insert.run('Dining Table', 'table', 120, 80, '#5C3317');
  insert.run('Side Table', 'table', 40, 40, '#5C3317');
  insert.run('Bed (Single)', 'bed', 90, 190, '#4A4A8A');
  insert.run('Bed (Double)', 'bed', 140, 190, '#4A4A8A');
  insert.run('Wardrobe', 'storage', 100, 50, '#6B4226');
  insert.run('Bookshelf', 'storage', 80, 25, '#6B4226');
  insert.run('TV Stand', 'media', 120, 40, '#333333');
  insert.run('Desk', 'workspace', 100, 55, '#7B5B3A');
}

module.exports = db;