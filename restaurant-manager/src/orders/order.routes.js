import { Router } from 'express';
import {
  addOrder,
  getOrders,
  getOrdersByUser,
  getOrderById,
  confirmOrder,
  changeOrderStatus,
  cancelOrder,
} from './order.controller.js';

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear orden
 *     tags: [Orders]
 */
router.post('/', addOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Orders]
 */
router.get('/', getOrders);

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Órdenes por usuario
 *     tags: [Orders]
 */
router.get('/user/:userId', getOrdersByUser);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     tags: [Orders]
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /orders/{id}/confirm:
 *   put:
 *     summary: Confirmar orden
 *     tags: [Orders]
 */
router.put('/:id/confirm', confirmOrder);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Cambiar estado de orden
 *     tags: [Orders]
 */
router.put('/:id/status', changeOrderStatus);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   put:
 *     summary: Cancelar orden
 *     tags: [Orders]
 */
router.put('/:id/cancel', cancelOrder);

export default router;