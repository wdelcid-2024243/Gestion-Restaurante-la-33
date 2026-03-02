import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'El ID del usuario es requerido'],
    },
    items: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu',
          required: [true, 'El plato es requerido'],
        },
        quantity: {
          type: Number,
          required: [true, 'La cantidad es requerida'],
          min: [1, 'La cantidad debe ser mayor a 0'],
        },
        priceAtPurchase: {
          type: Number,
          required: [true, 'El precio al comprar es requerido'],
          min: [0, 'El precio debe ser mayor o igual a 0'],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'El total debe ser mayor o igual a 0'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });

export default mongoose.model('Order', orderSchema);
