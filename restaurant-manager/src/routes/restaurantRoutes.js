/**
 * Rutas de Restaurantes
 */
const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

const controller = new RestaurantController();

/**
 * CRUD Restaurantes
 */
router.post('/', (req, res) => controller.crearRestaurante(req, res));
router.get('/', (req, res) => controller.obtenerTodos(req, res));
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));

/**
 * Búsquedas y filtros
 */
router.get('/buscar/nombre', (req, res) => controller.buscarPorNombre(req, res));
router.get('/categoria/:id', (req, res) => controller.buscarPorCategoria(req, res));
router.get('/ubicacion/:id', (req, res) => controller.buscarPorUbicacion(req, res));

module.exports = router;
