import express from 'express';
import { getCheckoutSession } from '../controllers/paymentControllers.js';

const router = express.Router();

router.post('/checkout-session', getCheckoutSession);

export default router;
