const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./db/conexion');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const clienteRoutes = require('./routes/cliente.routes');
const reparacionRoutes = require('./routes/reparacion.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes'); // ✅ si ya lo creaste

app.use('/api/clientes', clienteRoutes);
app.use('/api/reparaciones', reparacionRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes); // ✅

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
