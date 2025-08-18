const express = require('express');
const router = express.Router();
const reparacionController = require('../controllers/reparacion.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// Crear reparación (solo admin y técnico)
router.post(
  '/',
  authMiddleware,
  checkRole(['admin', 'tecnico']),
  reparacionController.crearReparacion
);

// Actualizar estado
router.put(
  '/:id',
  authMiddleware,
  checkRole(['admin', 'tecnico']),
  reparacionController.actualizarEstado
);

// Actualizar fecha_salida y estado
router.put(
  '/:id/salida',
  authMiddleware,
  checkRole(['admin', 'tecnico']),
  reparacionController.actualizarSalida
);

// Obtener todas las reparaciones
router.get('/', reparacionController.obtenerReparaciones);

module.exports = router;
