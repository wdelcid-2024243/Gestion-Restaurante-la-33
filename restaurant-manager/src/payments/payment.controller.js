import {
  registerPayment,
  fetchPayments,
  fetchPaymentById,
  fetchPaymentsByUser,
} from './payment.service.js';

// registrar pago
export const addPayment = async (req, res) => {
  try {
    const { order, amount, paymentMethod, status } = req.body;
    const userId = req.user.id;
    const payment = await registerPayment({ order, userId, amount, paymentMethod, status });
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// obtener todos los pagos
export const getPayments = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    const payments = await fetchPayments({ status, startDate, endDate });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener pagos', error: error.message });
  }
};

// obtener pago por id
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await fetchPaymentById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Pago no encontrado' });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener pago', error: error.message });
  }
};

// obtener pagos por usuario
export const getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, startDate, endDate } = req.query;
    const payments = await fetchPaymentsByUser(userId, { status, startDate, endDate });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener pagos del usuario', error: error.message });
  }
};
