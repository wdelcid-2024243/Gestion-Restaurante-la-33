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

router.post('/', addReservation);
router.get('/', getReservations);
router.get('/user/:userId', getReservationsByUser);
router.get('/:id', getReservationById);
router.put('/:id/cancel', cancelReservation);
router.put('/:id/complete', completeReservation);

export default router;