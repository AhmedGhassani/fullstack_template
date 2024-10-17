import { Router } from 'express';
import errorRouter from './error';
import * as appController from '../controllers';

const router = Router();

router.get(['/', '/health'], appController.healthCheck);

router.use('/error', errorRouter);

export { router };
