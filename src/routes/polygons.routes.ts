import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePolygonService from '../services/CreatePolygonService';
import DeletePolygonService from '../services/DeletePolygonService';

import Polygon from '../models/Polygon';

const polygonsRouter = Router();

polygonsRouter.get('/', async (request, response) => {
  const polygonRepository = getRepository(Polygon);
  const polygons = await polygonRepository.find({
    relations: ['points'],
    order: { area: 'ASC', name: 'ASC' },
  });
  return response.json(polygons);
});

polygonsRouter.get('/:id', async (request, response) => {
  const polygonRepository = getRepository(Polygon);
  const polygons = await polygonRepository.findOne({
    relations: ['points'],
    where: { id: request.params.id },
  });
  return response.json(polygons);
});

polygonsRouter.post('/', async (request, response) => {
  const { area, name, points } = request.body;

  const createPolygon = new CreatePolygonService();

  const polygon = await createPolygon.execute({
    area,
    name,
    points,
  });

  return response.json(polygon);
});

polygonsRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const deletePolygon = new DeletePolygonService();

  const resultDelete = await deletePolygon.execute({
    id,
  });
  if ((resultDelete.affected || 0) > 0) {
    return response.status(200).json({ message: 'Record has been deleted' });
  }
  return response.json({ message: `Record not found (id: ${id})` });
});

export default polygonsRouter;
