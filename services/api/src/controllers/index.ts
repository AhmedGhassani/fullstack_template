import { Request, Response, NextFunction } from 'express';
import { PROJECT_NAME } from '../config/env';

export const healthCheck = (req: Request, res: Response) => {
  res.send(`${PROJECT_NAME} is healthy`);
};
