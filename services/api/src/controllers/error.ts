import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizedError } from '../error/HttpError';

export const forceError = (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Forced Error');
};

export const badRequest = (req: Request, res: Response, next: NextFunction) => {
  throw new BadRequestError('Bad Request Test Message');
};

export const unauthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw new UnauthorizedError('Unauthorized Test Message');
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Record with ID x not found');
};
