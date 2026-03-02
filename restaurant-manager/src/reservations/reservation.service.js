import Reservation from './reservation.model.js';
import Restaurant from '../restaurants/restaurant.model.js';

export const createReservation = async ({ userId, restaurant: restaurantId, reservationDate, reservationTime, numberOfPeople, specialRequest }) => {
  // basic field checks
  if (numberOfPeople <= 0) {
    throw new Error('El número de personas debe ser mayor a 0');
  }
  const date = new Date(reservationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    throw new Error('La fecha de reservación no puede estar en el pasado');
  }
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(reservationTime)) {
    throw new Error('Formato de hora inválido, debe ser HH:mm');
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new Error('Restaurante no encontrado');
  }
  if (!restaurant.isActive) {
    throw new Error('No se puede reservar en un restaurante inactivo');
  }

  const existing = await Reservation.findOne({
    userId,
    restaurant: restaurantId,
    reservationDate: date,
    reservationTime,
  });
  if (existing) {
    throw new Error('Ya existe una reservación para el mismo usuario, restaurante, fecha y hora');
  }

  const reservation = new Reservation({
    userId,
    restaurant: restaurantId,
    reservationDate: date,
    reservationTime,
    numberOfPeople,
    specialRequest,
  });
  await reservation.save();
  return reservation;
};

export const fetchReservations = async ({ restaurant, date, status } = {}) => {
  const filter = {};
  if (restaurant) filter.restaurant = restaurant;
  if (date) {
    filter.reservationDate = new Date(date);
  }
  if (status) filter.status = status;
  return Reservation.find(filter).populate('restaurant');
};

export const fetchReservationById = async (id) => {
  return Reservation.findById(id).populate('restaurant');
};

export const fetchReservationsByUser = async (userId) => {
  return Reservation.find({ userId }).populate('restaurant');
};

export const cancelReservationById = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) return null;
  if (reservation.status !== 'ACTIVE') {
    throw new Error('Sólo se puede cancelar una reservación activa');
  }
  reservation.status = 'CANCELLED';
  await reservation.save();
  return reservation;
};

export const completeReservationById = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) return null;
  if (reservation.status !== 'ACTIVE') {
    throw new Error('Sólo se puede completar una reservación activa');
  }
  reservation.status = 'COMPLETED';
  await reservation.save();
  return reservation;
};