import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';
import { secretKey } from '../config/env';

dotenv.config();

export const generateToken = async (userID: string) => {
  try {
    const payload = { id: userID };
    const token = jwt.sign(payload, secretKey);

    await prisma.jwtToken.create({ data: { token: token, userId: userID } });

    return token;
  } catch (error) {
    throw 'Error Signing User ID';
  }
};

export const deleteToken = async (userID: string) => {
  try {
    await prisma.jwtToken.deleteMany({
      where: {
        userId: userID,
      },
    });
  } catch (error) {
    throw 'Error while deleting JWT token';
  }
};

export const refreshToken = async (existingToken: string) => {
  try {
    const decoded = jwt.verify(existingToken, secretKey) as jwt.JwtPayload;

    if (!decoded.id) {
      throw new Error('Invalid token');
    }

    const userID = decoded.id;

    const newPayload = { id: userID };
    const newToken = jwt.sign(newPayload, secretKey, { expiresIn: '1h' });

    await prisma.jwtToken.updateMany({
      where: {
        userId: userID,
        token: existingToken,
      },
      data: {
        token: newToken,
      },
    });

    return newToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    } else {
      throw new Error('Error while refreshing JWT token');
    }
  }
};
