import Menu from './menu.model.js';
import Restaurant from '../restaurants/restaurant.model.js';

export const createDish = async (dishData) => {
  const { price, stock, restaurant: restaurantId } = dishData;

  if (price <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  if (stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant || !restaurant.isActive) {
    throw new Error('Restaurante inválido o inactivo');
  }

  const dish = new Menu(dishData);
  await dish.save();
  return dish;
};

export const fetchDishes = async ({ restaurant, category } = {}) => {
  const filter = { isAvailable: true };
  if (restaurant) filter.restaurant = restaurant;
  if (category) filter.category = category;

  return Menu.find(filter).populate('restaurant');
};

export const fetchDishById = async (id) => {
  return Menu.findById(id).populate('restaurant');
};

export const updateDishById = async (id, updateData) => {
  const dish = await Menu.findById(id);
  if (!dish) return null;

  if (updateData.price != null && updateData.price <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  if (updateData.stock != null && updateData.stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  Object.assign(dish, updateData);
  await dish.save();
  return dish;
};

export const deactivateDishById = async (id) => {
  const dish = await Menu.findById(id);
  if (!dish) return null;

  dish.isAvailable = false;
  await dish.save();
  return dish;
};

export const updateDishStock = async (id, stock) => {
  const dish = await Menu.findById(id);
  if (!dish) return null;
  if (stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  dish.stock = stock;
  await dish.save();
  return dish;
};
