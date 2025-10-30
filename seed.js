// seed.js
const db = require('./db');

const insert = db.prepare('INSERT INTO products (name, description, price_cents, image, stock) VALUES (?, ?, ?, ?, ?)');
insert.run('Camiseta', 'Camiseta algodón', 2500, '/uploads/sample-shirt.jpg', 10);
insert.run('Taza', 'Taza cerámica', 1500, '/uploads/sample-mug.jpg', 20);

console.log('Seed completado.');
