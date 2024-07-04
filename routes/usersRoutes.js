import express from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} from '../controllers/authControllers.js';
import {
  getAllUsers,
  getUser,
  getMe,
  updateMe,
  createUser,
  deleteUser,
  uploadProductPhoto,
  updateUser,
} from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);

router.get('/me', protect, getMe);
router.patch('/updateMe', protect, uploadProductPhoto, updateMe);

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(protect, restrictTo('admin'), uploadProductPhoto, updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

export default router;
