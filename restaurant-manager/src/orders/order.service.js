import Order from './order.model.js';
import Menu from '../menu/menu.model.js';
import mongoose from 'mongoose';

const validTransitions = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

export const createOrder = async ({ userId, items }) => {
  if (!items || !items.length) {
    throw new Error('La orden debe contener al menos un item');
  }

  let total = 0;
  const resolvedItems = [];

  for (const it of items) {
    const { dish: dishId, quantity } = it;
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
    const dish = await Menu.findById(dishId);
    if (!dish || !dish.isAvailable) {
      throw new Error('Plato inválido o no disponible');
    }
    if (dish.stock < quantity) {
      throw new Error('No hay stock suficiente para el plato ' + dishId);
    }

    const priceAtPurchase = dish.price;
    total += priceAtPurchase * quantity;
    resolvedItems.push({ dish: dishId, quantity, priceAtPurchase });
  }

  const order = new Order({ userId, items: resolvedItems, totalAmount: total });
  await order.save();
  return order;
};

export const fetchOrders = async ({ status } = {}) => {
  const filter = {};
  if (status) filter.status = status;
  return Order.find(filter).populate('items.dish');
};

export const fetchOrdersByUser = async (userId, { status } = {}) => {
  const filter = { userId };
  if (status) filter.status = status;
  return Order.find(filter).populate('items.dish');
};

export const fetchOrderById = async (id) => {
  return Order.findById(id).populate('items.dish');
};

export const confirmOrderById = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(id).session(session);
    if (!order) return null;
    if (order.status !== 'PENDING') {
      throw new Error('Solo se puede confirmar una orden pendiente');
    }

    // reduce stock
    for (const it of order.items) {
      const dish = await Menu.findById(it.dish).session(session);
      if (!dish) {
        throw new Error('Plato no encontrado durante confirmación');
      }
      if (dish.stock < it.quantity) {
        throw new Error('Stock insuficiente para el plato ' + dish._id);
      }
      dish.stock -= it.quantity;
      await dish.save({ session });
    }

    order.status = 'CONFIRMED';
    await order.save({ session });
    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const changeOrderStatusById = async (id, newStatus) => {
  if (!Object.keys(validTransitions).includes(newStatus)) {
    throw new Error('Estado inválido');
  }

  // delegate to confirm or cancel if needed
  if (newStatus === 'CONFIRMED') {
    return confirmOrderById(id);
  }
  if (newStatus === 'CANCELLED') {
    return cancelOrderById(id);
  }

  const order = await Order.findById(id);
  if (!order) return null;

  const allowed = validTransitions[order.status] || [];
  if (!allowed.includes(newStatus)) {
    throw new Error(`No se puede cambiar de ${order.status} a ${newStatus}`);
  }

  order.status = newStatus;
  await order.save();
  return order;
};

export const cancelOrderById = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(id).session(session);
    if (!order) return null;
    if (order.status === 'CANCELLED') {
      return order;
    }

    if (order.status === 'CONFIRMED') {
      // restore stock
      for (const it of order.items) {
        const dish = await Menu.findById(it.dish).session(session);
        if (dish) {
          dish.stock += it.quantity;
          await dish.save({ session });
        }
      }
    }

    order.status = 'CANCELLED';
    await order.save({ session });
    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
