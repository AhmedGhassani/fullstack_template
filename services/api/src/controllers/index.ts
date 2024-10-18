import { Request, Response, NextFunction } from 'express';
import { PROJECT_NAME } from '../config/env';

class controller {
  public healthCheck = (req: Request, res: Response) => {
    res.send(`${PROJECT_NAME} is healthy`);
  };
}

export const appController = new controller();
