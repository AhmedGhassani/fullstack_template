import express from 'express';
import cors from 'cors';
import { APP_DOMAIN } from './config/env';
import { router } from './routes';

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: ['http://localhost', APP_DOMAIN],
    credentials: true,
  }),
);
app.use(express.json());

app.use('/api/v1', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is healthy`);
  console.log(`Health Check: http://localhost/api/v1`);
});
