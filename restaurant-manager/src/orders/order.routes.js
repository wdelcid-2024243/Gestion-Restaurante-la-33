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

router.post('/', addOrder);
router.get('/', getOrders);
router.get('/user/:userId', getOrdersByUser);
router.get('/:id', getOrderById);
router.put('/:id/confirm', confirmOrder);
router.put('/:id/status', changeOrderStatus);
router.put('/:id/cancel', cancelOrder);

export default router;
