import Restaurant from './restaurant.model.js';

export const createRestaurant = async (restaurantData) => {
  const restaurant = new Restaurant(restaurantData);
  await restaurant.save();
  return restaurant;
};

export const fetchAllRestaurants = async () => {
  return Restaurant.find();
};

export const fetchRestaurantById = async (id) => {
  return Restaurant.findById(id);
};

export const updateRestaurantById = async (id, updateData) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    return null;
  }
  if (!restaurant.isActive) {
    throw new Error('No se puede actualizar un restaurante inactivo');
  }

  Object.assign(restaurant, updateData);
  await restaurant.save();
  return restaurant;
};

export const deactivateRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    return null;
  }

  restaurant.isActive = false;
  await restaurant.save();
  return restaurant;
};
