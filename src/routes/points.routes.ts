import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePointService from '../services/CreatePointService';

import Point from '../models/Point';

const pointsRouter = Router();

pointsRouter.get('/', async (request, response) => {
  const pointRepository = getRepository(Point);
  const points = await pointRepository.find({ order: { created_at: 'ASC' } });
  return response.json(points);
});

pointsRouter.get('/:polygon_id', async (request, response) => {
  const pointsRepository = getRepository(Point);
  const points = await pointsRepository.find({
    where: { polygon_id: request.params.polygon_id },
    order: { created_at: 'ASC' },
  });
  return response.json(points);
});

pointsRouter.post('/', async (request, response) => {
  const { lat, lng, polygon_id } = request.body;

  const createPoint = new CreatePointService();

  const point = await createPoint.execute({
    lat,
    lng,
    polygon_id,
  });

  return response.json(point);
});

export default pointsRouter;
