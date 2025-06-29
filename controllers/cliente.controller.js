const db = require('../db/conexion');

exports.registrarCliente = (req, res) => {
  const { nombre, apellido, email, dni, telefono, direccion } = req.body;

  const sql = `INSERT INTO cliente (nombre, apellido, email, dni, telefono, direccion)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, apellido, email, dni, telefono, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Cliente registrado' });
  });
};

exports.loginCliente = (req, res) => {
  const { email, contraseña } = req.body;

  const sql = `SELECT * FROM cliente WHERE email = ? AND dni = ?`;

  db.query(sql, [email, contraseña], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Login exitoso', cliente: results[0] });
  });
};