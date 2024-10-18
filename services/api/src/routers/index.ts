import { Router } from 'express';
import errorRouter from './error';
import { appController } from '../controllers';

const router = Router();

router.get(['/', '/health'], appController.healthCheck);

router.use('/error', errorRouter);

export { router };
