import { Router } from 'express';
import {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from './restaurant.controller.js';

const router = Router();

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Crear restaurante
 *     tags: [Restaurants]
 */
router.post('/', addRestaurant);

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     tags: [Restaurants]
 */
router.get('/', getRestaurants);

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Obtener restaurante por ID
 *     tags: [Restaurants]
 */
router.get('/:id', getRestaurantById);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Actualizar restaurante
 *     tags: [Restaurants]
 */
router.put('/:id', updateRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Eliminar restaurante
 *     tags: [Restaurants]
 */
router.delete('/:id', deleteRestaurant);

export default router;
