import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';
import { InvalidBodyError } from '../../error/HttpError';

export function validation<T extends z.ZodType<any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new InvalidBodyError('Invalid request body', error));
      }
      next(error);
    }
  };
}
