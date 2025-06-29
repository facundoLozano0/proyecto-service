const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

router.post('/registrar', clienteController.registrarCliente);
router.post('/login', clienteController.loginCliente);

module.exports = router;