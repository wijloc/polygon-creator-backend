import { Router } from 'express';
import polygonsRouter from './polygons.routes';
import pointsRouter from './points.routes';

const routes = Router();

routes.use('/polygons', polygonsRouter);
routes.use('/points', pointsRouter);

export default routes;
