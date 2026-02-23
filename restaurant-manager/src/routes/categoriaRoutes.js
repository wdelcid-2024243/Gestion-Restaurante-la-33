/**
 * Rutas de Categorías
 */
const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

const controller = new CategoriaController();

/**
 * CRUD Categorías
 */
router.post('/', (req, res) => controller.crearCategoria(req, res));
router.get('/', (req, res) => controller.obtenerTodas(req, res));
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));

/**
 * Acciones especiales
 */
router.patch('/:id/desactivar', (req, res) => controller.desactivar(req, res));
router.patch('/:id/activar', (req, res) => controller.activar(req, res));
router.get('/buscar/nombre', (req, res) => controller.buscarPorNombre(req, res));

module.exports = router;
