import { Router } from 'express';
import {
  addPayment,
  getPayments,
  getPaymentById,
  getPaymentsByUser,
} from './payment.controller.js';

const router = Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Crear pago
 *     tags: [Payments]
 */
router.post('/', addPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags: [Payments]
 */
router.get('/', getPayments);

/**
 * @swagger
 * /payments/user/{userId}:
 *   get:
 *     summary: Pagos por usuario
 *     tags: [Payments]
 */
router.get('/user/:userId', getPaymentsByUser);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags: [Payments]
 */
router.get('/:id', getPaymentById);

export default router;