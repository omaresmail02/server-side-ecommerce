import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductPhoto,
} from '../controllers/productsControllers.js';
import {
  getAllReviews,
  createReview,
} from '../controllers/reviewsControllers.js';
import { protect, restrictTo } from '../controllers/authControllers.js';

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), uploadProductPhoto, createProduct);

router
  .route('/:id')
  .get(getProduct)
  .patch(protect, restrictTo('admin'), uploadProductPhoto, updateProduct)
  .delete(protect, restrictTo('admin'), uploadProductPhoto, deleteProduct);

router.get('/:productId/reviews', getAllReviews);
router.post('/:productId/reviews', protect, restrictTo('user'), createReview);

export default router;
