const express = require('express');
const router = express.Router();
const reparacionController = require('../controllers/reparacion.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// Crear reparación: solo técnico o admin
router.post(
  '/',
  authMiddleware,
  checkRole(['admin', 'tecnico']),
  reparacionController.crearReparacion
);

// Actualizar estado (opcional, si tienes esa función)
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

// Ver todas las reparaciones: acceso público (o protegido si querés)
router.get('/', reparacionController.obtenerReparaciones);

module.exports = router;
