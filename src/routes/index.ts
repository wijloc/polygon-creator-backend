import { Router } from 'express';
import polygonsRouter from './polygons.routes';
import pointsRouter from './points.routes';
import customersRouter from './customers.routes';

const routes = Router();

routes.use('/polygons', polygonsRouter);
routes.use('/points', pointsRouter);
routes.use('/customers', customersRouter);

export default routes;
