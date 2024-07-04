import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  uploadCategorPhoto,
} from './../controllers/categoriesControllers.js';
import { protect, restrictTo } from '../controllers/authControllers.js';
import {
  createProduct,
  getAllProducts,
} from '../controllers/productsControllers.js';

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post(protect, restrictTo('admin'), uploadCategorPhoto, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .patch(protect, restrictTo('admin'), uploadCategorPhoto, updateCategory)
  .delete(protect, restrictTo('admin'), uploadCategorPhoto, deleteCategory);

router.get('/:categoryName/products', getAllProducts);
router.post(
  '/:categoryName/products',
  protect,
  restrictTo('admin'),
  createProduct
);

export default router;
