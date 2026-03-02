import { Router } from 'express';
import {
  addDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
  changeDishStock,
} from './menu.controller.js';

const router = Router();

router.post('/', addDish);
router.get('/', getDishes);
router.get('/:id', getDishById);
router.put('/:id', updateDish);
router.put('/:id/stock', changeDishStock);
router.delete('/:id', deleteDish);

export default router;
