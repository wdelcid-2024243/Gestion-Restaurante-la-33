import {
  createReservation,
  fetchReservations,
  fetchReservationById,
  fetchReservationsByUser,
  cancelReservationById,
  completeReservationById,
} from './reservation.service.js';

// crear reservación
export const addReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const reservation = await createReservation({ userId, ...req.body });
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// obtener todas las reservaciones (filtros opcionales)
export const getReservations = async (req, res) => {
  try {
    const { restaurant, date, status } = req.query;
    const reservations = await fetchReservations({ restaurant, date, status });
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener las reservaciones', error: error.message });
  }
};

// obtener reservaciones por usuario
export const getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await fetchReservationsByUser(userId);
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener las reservaciones del usuario', error: error.message });
  }
};

// obtener reservación por id
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await fetchReservationById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la reservación', error: error.message });
  }
};

// cancelar reservación
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await cancelReservationById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Reservación cancelada', data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// completar reservación
export const completeReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await completeReservationById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservación no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Reservación completada', data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};