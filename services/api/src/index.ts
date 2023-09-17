import express, { Request, Response, NextFunction, json } from 'express';
const cors = require('cors');
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(json());

app.use(
  cors({
    origin: ['http://localhost:5173', process.env.VITE_APP_URL], // Add the allowed origins here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials like cookies and authorization headers
  }),
);

app.get('/api', (req: Request, res: Response) => {
  res.status(200).send(`${process.env.APP_NAME} is Healthy`);
});

// Add Routes Here

app.use('/api', router);

// Don't Add Routes Below

// Handle 404 Errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: `Path ${req.url} Not Found` });
});

// Handle Uncaught Internal Server Errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on ${port}`);
  console.log(`Health Check: http://0.0.0.0:${port}/api`);
});
