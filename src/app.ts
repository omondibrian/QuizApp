/* istanbul ignore file */
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import { notFound, errorHandler } from './middlewares/middleware';
import Questions from './routes/Questions';
import Users from './routes/Users';
const app = express();
// app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/user', Users);
app.use('/api/v1/questions', Questions);

app.use(notFound);
app.use(errorHandler);

export default app;
