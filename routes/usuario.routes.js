const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/registrar', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
