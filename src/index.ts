import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { authMiddleware } from './middlewares/auth-middleware';
import { errorMiddleware } from './middlewares/errors/error';
import { authRouter } from './routes/auth';
import { categoriesRouter } from './routes/categories';
import { currenciesRouter } from './routes/currencies';
import { expensesRouter } from './routes/expenses';
import { profileRouter } from './routes/profile';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

import { connectToDatabase } from './config/db';

connectToDatabase();



// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/currencies', authMiddleware, currenciesRouter);
app.use('/categories', authMiddleware, categoriesRouter);
app.use('/expenses', authMiddleware, expensesRouter);

app.use(errorMiddleware);


try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${ port }`);
  });
} catch (error) {
  // @ts-ignore
  console.error(`Error occured: ${ error?.message }`);
}
