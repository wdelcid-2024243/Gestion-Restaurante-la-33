import { Router } from 'express';
import {
  addReservation,
  getReservations,
  getReservationsByUser,
  getReservationById,
  cancelReservation,
  completeReservation,
} from './reservation.controller.js';

const router = Router();

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crear reservación
 *     tags: [Reservations]
 */
router.post('/', addReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     tags: [Reservations]
 */
router.get('/', getReservations);

/**
 * @swagger
 * /reservations/user/{userId}:
 *   get:
 *     summary: Reservaciones por usuario
 *     tags: [Reservations]
 */
router.get('/user/:userId', getReservationsByUser);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtener reservación por ID
 *     tags: [Reservations]
 */
router.get('/:id', getReservationById);

/**
 * @swagger
 * /reservations/{id}/cancel:
 *   put:
 *     summary: Cancelar reservación
 *     tags: [Reservations]
 */
router.put('/:id/cancel', cancelReservation);

/**
 * @swagger
 * /reservations/{id}/complete:
 *   put:
 *     summary: Completar reservación
 *     tags: [Reservations]
 */
router.put('/:id/complete', completeReservation);

export default router;