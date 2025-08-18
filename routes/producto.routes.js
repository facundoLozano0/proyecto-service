const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// Crear producto (solo admin)
router.post(
  '/',
  authMiddleware,
  checkRole(['admin']),
  productoController.crearProducto
);

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Actualizar producto (solo admin)
router.put(
  '/:id',
  authMiddleware,
  checkRole(['admin']),
  productoController.actualizarProducto
);

// Eliminar producto (solo admin)
router.delete(
  '/:id',
  authMiddleware,
  checkRole(['admin']),
  productoController.eliminarProducto
);

module.exports = router;
