const db = require('../db/conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
  const { email, contraseña, rol, id_relacionado } = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10);

    const sql = `INSERT INTO usuario (email, contraseña, rol, id_relacionado)
                 VALUES (?, ?, ?, ?)`;

    db.query(sql, [email, hash, rol, id_relacionado], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en registro' });
  }
};

exports.loginUsuario = (req, res) => {
  const { email, contraseña } = req.body;

  const sql = `SELECT * FROM usuario WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const usuario = results[0];
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ mensaje: 'Login exitoso', token });
  });
};
