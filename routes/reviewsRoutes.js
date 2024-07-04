import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview,
} from '../controllers/reviewsControllers.js';
import { protect, restrictTo } from '../controllers/authControllers.js';

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(protect, restrictTo('user'), updateReview)
  .delete(protect, deleteReview);

export default router;
