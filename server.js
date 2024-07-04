import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { autoIndex: true })
  .then(console.log('Connected to database successfully'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
