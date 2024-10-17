import express from 'express';
import * as errorController from '../controllers/error';

const errorRouter = express.Router();

errorRouter.get('/force-error', errorController.forceError);
errorRouter.get('/bad-request', errorController.badRequest);
errorRouter.get('/unauthorized', errorController.unauthorized);
errorRouter.get('/not-found', errorController.notFound);

export default errorRouter;
