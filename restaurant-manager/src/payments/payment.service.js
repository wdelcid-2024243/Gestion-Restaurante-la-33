import Payment from './payment.model.js';
import Order from '../orders/order.model.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const registerPayment = async ({ order: orderId, userId, amount, paymentMethod, status }) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error('Orden no encontrada');
  }
  if (['CANCELLED', 'DELIVERED'].includes(order.status)) {
    throw new Error('No se puede pagar una orden cancelada o entregada');
  }
  if (order.status !== 'CONFIRMED') {
    throw new Error('La orden debe estar confirmada para pagar');
  }

  const existing = await Payment.findOne({ order: orderId, status: 'SUCCESS' });
  if (existing) {
    throw new Error('Ya existe un pago exitoso para esta orden');
  }
  if (amount !== order.totalAmount) {
    throw new Error('El monto no coincide con el total de la orden');
  }

  const transactionId = uuidv4();

  const payment = new Payment({ order: orderId, userId, amount, paymentMethod, status, transactionId });
  await payment.save();

  if (status === 'SUCCESS') {
    order.status = 'PREPARING';
    await order.save();
  }

  return payment;
};

export const fetchPayments = async ({ status, startDate, endDate } = {}) => {
  const filter = {};
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  return Payment.find(filter).populate('order');
};

export const fetchPaymentById = async (id) => {
  return Payment.findById(id).populate('order');
};

export const fetchPaymentsByUser = async (userId, { status, startDate, endDate } = {}) => {
  const filter = { userId };
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  return Payment.find(filter).populate('order');
};
