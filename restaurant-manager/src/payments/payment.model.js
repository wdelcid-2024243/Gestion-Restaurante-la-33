import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'La orden es requerida'],
    },
    userId: {
      type: String,
      required: [true, 'El ID del usuario es requerido'],
    },
    amount: {
      type: Number,
      required: [true, 'El monto es requerido'],
      min: [0, 'El monto debe ser mayor o igual a 0'],
    },
    paymentMethod: {
      type: String,
      enum: ['CARD', 'CASH', 'TRANSFER'],
      required: [true, 'El método de pago es requerido'],
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED'],
      required: [true, 'El estado es requerido'],
    },
    transactionId: {
      type: String,
      unique: true,
      required: [true, 'El ID de transacción es requerido'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ order: 1 });

export default mongoose.model('Payment', paymentSchema);
