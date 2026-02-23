/**
 * Archivo principal de la aplicación
 * Restaurant Manager - Sistema de Gestión de Restaurantes
 */
const express = require('express');
const cors = require('cors');

// Importar rutas
const restaurantRoutes = require('./routes/restaurantRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');

// Inicializar aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas API
app.use('/api/restaurantes', restaurantRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);

// Ruta de bienvenida
app.get('/api', (req, res) => {
  res.json({
    mensaje: 'Bienvenido al Restaurant Manager API',
    version: '1.0.0',
    endpoints: {
      restaurantes: '/api/restaurantes',
      horarios: '/api/horarios',
      categorias: '/api/categorias',
      ubicaciones: '/api/ubicaciones'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Restaurant Manager API ejecutándose en puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/api`);
  });
}

module.exports = app;
