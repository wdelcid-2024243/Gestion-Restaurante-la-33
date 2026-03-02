import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'El ID del usuario es requerido'],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'El restaurante es requerido'],
    },
    reservationDate: {
      type: Date,
      required: [true, 'La fecha de reservación es requerida'],
    },
    reservationTime: {
      type: String,
      required: [true, 'La hora de reservación es requerida'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido, debe ser HH:mm'],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'El número de personas es requerido'],
      min: [1, 'Debe haber al menos una persona'],
    },
    specialRequest: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED', 'COMPLETED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

reservationSchema.index({ userId: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ restaurant: 1 });
reservationSchema.index({ reservationDate: 1 });
// prevent duplicates per user/restaurant/date/time
reservationSchema.index(
  { userId: 1, restaurant: 1, reservationDate: 1, reservationTime: 1 },
  { unique: true }
);

export default mongoose.model('Reservation', reservationSchema);