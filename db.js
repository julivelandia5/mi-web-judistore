// db.js
const Database = require('better-sqlite3');
const db = new Database('store.db');

db.prepare(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  description TEXT,
  price_cents INTEGER,
  image TEXT,
  stock INTEGER
)`).run();

module.exports = db;
