import { Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../error/HttpError';

class controller {
  public forceError = (req: Request, res: Response, next: NextFunction) => {
    throw new Error('Forced Error');
  };

  public badRequest = (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestError('Bad Request Test Message');
  };

  public unauthorized = (req: Request, res: Response, next: NextFunction) => {
    throw new UnauthorizedError('Unauthorized Test Message');
  };

  public notFound = (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundError('Record with ID x not found');
  };
}

export const errorController = new controller();
