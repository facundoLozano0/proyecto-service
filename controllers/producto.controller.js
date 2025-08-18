const db = require('../db/conexion');

// Crear producto
exports.crearProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, tipo } = req.body;
  const sql = `INSERT INTO producto (nombre, descripcion, precio, stock, tipo) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, descripcion, precio, stock, tipo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ mensaje: 'Producto creado correctamente', id: result.insertId });
  });
};

// Obtener productos
exports.obtenerProductos = (req, res) => {
  const sql = `SELECT * FROM producto`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Actualizar producto
exports.actualizarProducto = (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, stock, tipo } = req.body;

  const sql = `UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, tipo = ? WHERE id_producto = ?`;

  db.query(sql, [nombre, descripcion, precio, stock, tipo, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Producto actualizado correctamente' });
  });
};

// Eliminar producto
exports.eliminarProducto = (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM producto WHERE id_producto = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
};
