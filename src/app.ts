import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errorMiddleware';

import router from './router/index';

const app = express();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(cookieParser());

app.use(express.json());

app.use('/', router())

app.use(errorMiddleware);

export default app;