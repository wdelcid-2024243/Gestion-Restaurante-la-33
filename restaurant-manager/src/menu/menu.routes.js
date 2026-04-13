import { Router } from 'express';
import {
  addDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
  changeDishStock,
} from './menu.controller.js';

const router = Router();

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Crear un plato
 *     tags: [Menu]
 */
router.post('/', addDish);

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Obtener todos los platos
 *     tags: [Menu]
 */
router.get('/', getDishes);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Obtener plato por ID
 *     tags: [Menu]
 */
router.get('/:id', getDishById);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Actualizar plato
 *     tags: [Menu]
 */
router.put('/:id', updateDish);

/**
 * @swagger
 * /menu/{id}/stock:
 *   put:
 *     summary: Cambiar stock del plato
 *     tags: [Menu]
 */
router.put('/:id/stock', changeDishStock);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Eliminar plato
 *     tags: [Menu]
 */
router.delete('/:id', deleteDish);

export default router;