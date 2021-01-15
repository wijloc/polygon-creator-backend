import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreatePolygonService from '../services/CreatePolygonService';
import DeletePolygonService from '../services/DeletePolygonService';

import Polygon from '../models/Polygon';
import Point from '../models/Point';

const polygonsRouter = Router();

polygonsRouter.get('/', async (request, response) => {
  const polygonRepository = getRepository(Polygon);
  const polygons = await polygonRepository
    .createQueryBuilder('polygons')
    .leftJoinAndSelect('polygons.points', 'points')
    .orderBy({
      'polygons.area': 'ASC',
      'points.order': 'ASC',
    })
    .getMany();
  return response.json(polygons);
});

polygonsRouter.get('/:id', async (request, response) => {
  const polygonRepository = getRepository(Polygon);
  const polygons = await polygonRepository
    .createQueryBuilder('polygons')
    .leftJoinAndSelect('polygons.points', 'points')
    .where('polygons.id = :id', { id: request.params.id })
    .orderBy({
      'points.order': 'ASC',
    })
    .getOne();
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

polygonsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  const polygonsRepository = getRepository(Polygon);

  const polygon = await polygonsRepository.findOne({ id });
  if (polygon) {
    polygonsRepository.merge(polygon, req.body);

    const result = await polygonsRepository.save(polygon);

    if (result) {
      // ao editar o polígono, apaga todos os seus pontos, pois na sequência deve incluir os pontos novamente
      const pointsRepository = getRepository(Point);
      pointsRepository.delete({ polygon_id: polygon.id });
    }

    return res.send(result);
  }
  return res.status(404).json({ message: 'Record not found' });
});

export default polygonsRouter;
