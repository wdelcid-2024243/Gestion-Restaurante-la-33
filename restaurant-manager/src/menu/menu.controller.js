import {
  createDish,
  fetchDishes,
  fetchDishById,
  updateDishById,
  deactivateDishById,
  updateDishStock,
} from './menu.service.js';

// crear plato
export const addDish = async (req, res) => {
  try {
    const dish = await createDish(req.body);
    res.status(201).json({ success: true, data: dish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// obtener todos los platos
export const getDishes = async (req, res) => {
  try {
    const { restaurant, category } = req.query;
    const dishes = await fetchDishes({ restaurant, category });
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los platos', error: error.message });
  }
};

// obtener plato por id
export const getDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await fetchDishById(id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Plato no encontrado' });
    }
    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el plato', error: error.message });
  }
};

// actualizar plato
export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateDishById(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Plato no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Plato actualizado', data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// desactivar plato
export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await deactivateDishById(id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Plato no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Plato desactivado', data: dish });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al desactivar el plato', error: error.message });
  }
};

// actualizar stock manualmente
export const changeDishStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const dish = await updateDishStock(id, stock);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Plato no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Stock actualizado', data: dish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
