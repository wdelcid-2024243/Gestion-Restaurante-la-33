import {
  totalRevenueReport,
  salesByDate,
  mostSoldProducts,
  ordersByStatus,
  reservationsReport,
} from './report.service.js';

export const getTotalRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await totalRevenueReport({ startDate, endDate });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSalesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await salesByDate({ startDate, endDate });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const data = await mostSoldProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener productos más vendidos', error: error.message });
  }
};

export const getOrdersByStatusReport = async (req, res) => {
  try {
    const data = await ordersByStatus();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reporte de estados', error: error.message });
  }
};

export const getReservationsReport = async (req, res) => {
  try {
    const data = await reservationsReport();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener reporte de reservaciones', error: error.message });
  }
};

