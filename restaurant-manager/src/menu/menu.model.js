import mongoose from 'mongoose';

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del plato es requerido'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio debe ser mayor a 0'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'El restaurante es requerido'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

menuSchema.index({ restaurant: 1 });
menuSchema.index({ category: 1 });
menuSchema.index({ isAvailable: 1 });

export default mongoose.model('Menu', menuSchema);
