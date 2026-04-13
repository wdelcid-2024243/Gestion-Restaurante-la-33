import { Router } from 'express';
import {
  getTotalRevenue,
  getSalesByDate,
  getTopProducts,
  getOrdersByStatusReport,
  getReservationsReport,
} from './report.controller.js';

const router = Router();

/**
 * @swagger
 * /reports/revenue:
 *   get:
 *     summary: Obtener ingresos totales
 *     tags: [Reports]
 */
router.get('/revenue', getTotalRevenue);

/**
 * @swagger
 * /reports/sales-by-date:
 *   get:
 *     summary: Obtener ventas por fecha
 *     tags: [Reports]
 */
router.get('/sales-by-date', getSalesByDate);

/**
 * @swagger
 * /reports/top-products:
 *   get:
 *     summary: Obtener productos más vendidos
 *     tags: [Reports]
 */
router.get('/top-products', getTopProducts);

/**
 * @swagger
 * /reports/orders-status:
 *   get:
 *     summary: Obtener reporte de órdenes por estado
 *     tags: [Reports]
 */
router.get('/orders-status', getOrdersByStatusReport);

/**
 * @swagger
 * /reports/reservations-status:
 *   get:
 *     summary: Obtener reporte de reservaciones
 *     tags: [Reports]
 */
router.get('/reservations-status', getReservationsReport);


export default router;
