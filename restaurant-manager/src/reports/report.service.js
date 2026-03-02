import Payment from '../payments/payment.model.js';
import Order from '../orders/order.model.js';
import Reservation from '../reservations/reservation.model.js';
import mongoose from 'mongoose';

const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) throw new Error('Fecha inválida: ' + value);
  return d;
};

export const totalRevenueReport = async ({ startDate, endDate } = {}) => {
  const match = { status: 'SUCCESS' };
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (start || end) match.createdAt = {};
  if (start) match.createdAt.$gte = start;
  if (end) match.createdAt.$lte = end;

  const result = await Payment.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
        paidOrders: '$count',
      },
    },
  ]).exec();

  return result[0] || { totalRevenue: 0, paidOrders: 0 };
};

export const salesByDate = async ({ startDate, endDate } = {}) => {
  const match = { status: 'SUCCESS' };
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (start || end) match.createdAt = {};
  if (start) match.createdAt.$gte = start;
  if (end) match.createdAt.$lte = end;

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
        },
        totalRevenue: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
          },
        },
        totalRevenue: 1,
      },
    },
    { $sort: { date: 1 } },
  ];

  return Payment.aggregate(pipeline).exec();
};

export const mostSoldProducts = async () => {
  const pipeline = [
    { $match: { status: { $in: ['CONFIRMED', 'DELIVERED'] } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.dish',
        quantitySold: { $sum: '$items.quantity' },
      },
    },
    { $sort: { quantitySold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'menus',
        localField: '_id',
        foreignField: '_id',
        as: 'dish',
      },
    },
    { $unwind: '$dish' },
    {
      $project: {
        _id: 0,
        dishId: '$_id',
        dishName: '$dish.name',
        quantitySold: 1,
      },
    },
  ];

  return Order.aggregate(pipeline).exec();
};

export const ordersByStatus = async () => {
  const pipeline = [
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ];
  return Order.aggregate(pipeline).exec();
};

export const reservationsReport = async () => {
  const pipeline = [
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ];
  return Reservation.aggregate(pipeline).exec();
};


