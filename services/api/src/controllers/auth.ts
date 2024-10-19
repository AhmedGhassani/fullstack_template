import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { sendSuccessResponse } from '../utils/responseUtil';
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from '../error/HttpError';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils';
import { User } from '@prisma/client';

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    dob: z.preprocess(
      (arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      },
      z.date().refine((date) => !isNaN(date.getTime()), {
        message: 'Invalid date of birth',
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
    user: z.object({
      id: z.string(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type RegisterRequest = Request & {
  body: z.infer<typeof loginSchema>;
};

type LoginRequest = Request & {
  body: z.infer<typeof loginSchema>;
};

type RefreshTokenRequest = Request & {
  body: z.infer<typeof refreshTokenSchema>;
};

type UpdatePasswordRequest = Request & {
  body: z.infer<typeof updatePasswordSchema>;
};

class controller {
  public registerUser = async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { firstName, lastName, email, password, dob } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictError('User with provided email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          dob: new Date(dob),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dob: true,
        },
      });

      sendSuccessResponse(res, 201, 'User registered successfully', user);
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: LoginRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = await generateRefreshToken(user.id);

      sendSuccessResponse(res, 200, 'Login successful', {
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (
    req: RefreshTokenRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken } = req.body;

      const decoded = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!decoded) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      const accessToken = generateAccessToken(user.id);
      const newRefreshToken = await generateRefreshToken(user.id);

      sendSuccessResponse(res, 200, 'Token refreshed', {
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  public updatePassword = async (
    req: UpdatePasswordRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { password, user } = req.body;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await bcrypt.hash(password, 10),
        },
      });
      sendSuccessResponse(res, 200, 'Password updated successfully');
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new controller();
