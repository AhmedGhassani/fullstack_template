import { Request, Response, Router } from 'express';
import { PROJECT_NAME } from '../config/env';

const router = Router();

router.get(['/', '/health'], (req: Request, res: Response) => {
  res.send(`${PROJECT_NAME} is healthy`);
});

export { router };
