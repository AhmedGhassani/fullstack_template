import { Router } from 'express';
import { appController } from '../controllers';
import errorRouter from './error';
import authRouter from './auth';

const router = Router();

router.get(['/', '/health'], appController.healthCheck);

router.use('/error', errorRouter);
router.use('/auth', authRouter);

export { router };
