import jwt from 'jsonwebtoken';
import { API_JWT_ACCESS_SECRET, API_JWT_REFRESH_SECRET } from '../config/env';
import prisma from '../config/prisma';
import { UnauthorizedError } from '../error/HttpError';

const accessSecret = API_JWT_ACCESS_SECRET;
const refreshSecret = API_JWT_REFRESH_SECRET;

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, accessSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = async (userId: string) => {
  const refreshToken = await jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: '7d',
  });

  try {
    await prisma.refreshToken.delete({
      where: {
        userId,
      },
    });
  } catch (error: any) {
    if (error.code !== 'P2025') {
    }
  }

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
    },
  });

  return refreshToken;
};

export const verifyAccessToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, accessSecret) as jwt.JwtPayload;

    if (!decoded.id) {
      throw new UnauthorizedError('Invalid token');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }
    throw error;
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, refreshSecret) as jwt.JwtPayload;

    if (!decoded.id) {
      throw new UnauthorizedError('Invalid token');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }
    throw error;
  }
};
