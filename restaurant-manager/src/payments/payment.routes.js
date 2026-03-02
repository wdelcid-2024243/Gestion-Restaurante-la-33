import { Router } from 'express';
import {
  addPayment,
  getPayments,
  getPaymentById,
  getPaymentsByUser,
} from './payment.controller.js';

const router = Router();

router.post('/', addPayment);
router.get('/', getPayments);
router.get('/user/:userId', getPaymentsByUser);
router.get('/:id', getPaymentById);

export default router;
