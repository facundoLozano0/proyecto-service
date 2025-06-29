const db = require('../db/conexion');

// Crear nueva reparación
exports.crearReparacion = (req, res) => {
 console.log('Body recibido:', req.body);
  const {
    id_cliente,
    id_tecnico,
    fecha_ingreso,
    descripcion_problema,
    estado,
    costo
  } = req.body;

  const sql = `INSERT INTO reparacion 
    (id_cliente, id_tecnico, fecha_ingreso, descripcion_problema, estado, costo)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [id_cliente, id_tecnico, fecha_ingreso, descripcion_problema, estado, costo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Reparación registrada correctamente', id: result.insertId });
  });
};

// Obtener todas las reparaciones
exports.obtenerReparaciones = (req, res) => {
  const sql = `SELECT * FROM reparacion`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Actualizar el estado de una reparación
exports.actualizarEstado = (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;

  const sql = `UPDATE reparacion SET estado = ? WHERE id_reparacion = ?`;

  db.query(sql, [estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
};

// Actualizar fecha_salida y estado de una reparación
exports.actualizarSalida = (req, res) => {
  const id = req.params.id;
  const { fecha_salida, estado } = req.body;

  const sql = `UPDATE reparacion SET fecha_salida = ?, estado = ? WHERE id_reparacion = ?`;

  db.query(sql, [fecha_salida, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Reparación no encontrada' });
    }

    res.json({ mensaje: 'Fecha de salida y estado actualizados correctamente' });
  });
};
