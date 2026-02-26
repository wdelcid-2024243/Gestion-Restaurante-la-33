/**
 * Rutas de Horarios
 */
const express = require('express');
const router = express.Router();
const HorarioController = require('../controllers/HorarioController');

const controller = new HorarioController();

/**
 * CRUD Horarios
 */
router.post('/', (req, res) => controller.crearHorario(req, res));
router.get('/', (req, res) => controller.obtenerTodos(req, res));
router.get('/:id', (req, res) => controller.obtenerPorId(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));

/**
 * Búsquedas y filtros
 */
router.get('/restaurante/:restauranteId', (req, res) => controller.obtenerPorRestaurante(req, res));
router.get('/dia/:diaSemana', (req, res) => controller.obtenerPorDia(req, res));
router.patch('/:id/cerrado', (req, res) => controller.marcarCerrado(req, res));

module.exports = router;
