import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import appRouter from './routes/todoRoute';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewapiares/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());
app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));