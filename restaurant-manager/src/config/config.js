/**
 * Archivo de configuración
 * Variables y constantes de configuración de la aplicación
 */
require('dotenv').config();

module.exports = {
  // Puerto del servidor
  PORT: process.env.PORT || 3000,

  // Entorno
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Base de datos (para futuro uso)
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 5432,
    USER: process.env.DB_USER || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    NAME: process.env.DB_NAME || 'restaurant_manager'
  },

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // JWT (para futuro uso)
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',

  // API
  API_VERSION: 'v1',
  API_PREFIX: '/api'
};
