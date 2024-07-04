import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import productsRouter from './routes/productsRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://eureka-store.vercel.app', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and other credentials
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/payment', paymentRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'fails',
    message,
  });
});

export default app;
