import express, { Application } from 'express';
import { authRouter } from './routes/auth';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { dataBaseConfig } from './config/dataBaseConfig';
import { errorMiddleware } from './middlewares/errors/error';
import { profileRouter } from './routes/profile';
import { authMiddleware } from './middlewares/auth-middleware';
import { currenciesRouter } from './routes/currencies';
import { categoriesRouter } from './routes/categories';

const app: Application = express();
const port = process.env.PORT || 3000;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));
}


// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/currencies', authMiddleware, currenciesRouter);
app.use('/categories', authMiddleware, categoriesRouter);

app.use(errorMiddleware);


try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${ port }`);
  });
} catch (error) {
  console.error(`Error occured: ${ error.message }`);
}
