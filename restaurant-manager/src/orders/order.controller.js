import {
  createOrder,
  fetchOrders,
  fetchOrdersByUser,
  fetchOrderById,
  confirmOrderById,
  changeOrderStatusById,
  cancelOrderById,
} from './order.service.js';

// crear orden
export const addOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await createOrder({ userId, ...req.body });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// obtener todas las ordenes (filtro opcional por estado)
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const orders = await fetchOrders({ status });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener las órdenes', error: error.message });
  }
};

// obtener ordenes por usuario
export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;
    const orders = await fetchOrdersByUser(userId, { status });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener las órdenes del usuario', error: error.message });
  }
};

// obtener orden por id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await fetchOrderById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la orden', error: error.message });
  }
};

// confirmar orden
export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await confirmOrderById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Orden confirmada', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// cambiar estado de orden
export const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await changeOrderStatusById(id, status);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Estado actualizado', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// cancelar orden
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await cancelOrderById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Orden cancelada', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
