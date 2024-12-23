import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { APP_DOMAIN } from './config/env';
import { router } from './routers';
import { logger } from './config/logger';
import { NotFoundError } from './error/HttpError';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ['http://localhost', APP_DOMAIN],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600,
  }),
);

app.use(express.json());

app.use('/api/v1', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.method} ${req.url} not found`));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }

  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server is healthy`);
  logger.info(`Health Check: http://localhost/api/v1`);
});
