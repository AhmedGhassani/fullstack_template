import { Router } from 'express';
import {
  authController,
  createUserSchema,
  loginSchema,
  refreshTokenSchema,
  updatePasswordSchema,
} from '../controllers/auth';
import { validation } from '../middleware/validation';
import authMiddleware from '../middleware/authMiddleware';

const authRouter = Router();

authRouter.post(
  '/register',
  [validation(createUserSchema)],
  authController.registerUser,
);
authRouter.post('/login', [validation(loginSchema)], authController.loginUser);
authRouter.post(
  '/refresh',
  [validation(refreshTokenSchema)],
  authController.refreshToken,
);
authRouter.post(
  '/update-password',
  [authMiddleware, validation(updatePasswordSchema)],
  authController.updatePassword,
);
authRouter.post('/forgot-password', authController.forgotPassword);

export default authRouter;
