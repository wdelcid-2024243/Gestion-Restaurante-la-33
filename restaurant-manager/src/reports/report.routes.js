import { Router } from 'express';
import {
  getTotalRevenue,
  getSalesByDate,
  getTopProducts,
  getOrdersByStatusReport,
  getReservationsReport,
} from './report.controller.js';

const router = Router();

router.get('/revenue', getTotalRevenue);
router.get('/sales-by-date', getSalesByDate);
router.get('/top-products', getTopProducts);
router.get('/orders-status', getOrdersByStatusReport);
router.get('/reservations-status', getReservationsReport);


export default router;
