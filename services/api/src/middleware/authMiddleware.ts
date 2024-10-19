import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwtUtils';
import { UnauthorizedError } from '../error/HttpError';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    throw new UnauthorizedError('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyAccessToken(token);

    req.body.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}
