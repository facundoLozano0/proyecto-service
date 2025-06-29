const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // El token normalmente se manda en el header Authorization con formato: "Bearer TOKEN"
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // separa "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ mensaje: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      rol: decoded.rol,
    };
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;
