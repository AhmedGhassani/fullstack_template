import express, { Request, Response } from 'express';
import userRouter from './users';

const router = express.Router();

router.use('/users', userRouter);

export default router;
