/**
 * Rutas de Ubicaciones
 */
const express = require('express');
const router = express.Router();
const UbicacionController = require('../controllers/UbicacionController');

const controller = new UbicacionController();

/**
 * CRUD Ubicaciones
 */
router.post('/', (req, res) => controller.crearUbicacion(req, res));
router.get('/', (req, res) => controller.obtenerTodas(req, res));
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));

/**
 * Búsquedas y filtros
 */
router.get('/ciudad/:ciudad', (req, res) => controller.buscarPorCiudad(req, res));
router.get('/pais/:pais', (req, res) => controller.buscarPorPais(req, res));
router.get('/estado/:estado', (req, res) => controller.buscarPorEstado(req, res));
router.get('/:id/completa', (req, res) => controller.obtenerUbicacionCompleta(req, res));
router.get('/:id/coordenadas', (req, res) => controller.obtenerCoordenadas(req, res));

module.exports = router;
