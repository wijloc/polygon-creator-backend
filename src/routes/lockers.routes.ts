import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateLockersService from '../services/CreateLockersService';

import Locker from '../models/Locker';

const lockersRouter = Router();

lockersRouter.get('/', async (request, response) => {
  const lockersRepository = getRepository(Locker);
  const lockers = await lockersRepository.find();
  return response.json(lockers);
});

lockersRouter.get('/instance', async (request, response) => {
  const lockerRepository = getRepository(Locker);
  const polygons = await lockerRepository
    .createQueryBuilder('lockers')
    .select(['lockers.lat', 'lockers.lng'])
    .orderBy({
      'lockers.created_at': 'ASC',
    })
    .getMany();
  const textInstance = `${polygons
    .map((locker, index) => `${index + 1} ${locker.lat} ${locker.lng}`)
    .reduce((accumulator, current) => `${accumulator}\n${current}`)}\n\r`;
  return response.json({ instance: textInstance });
});

lockersRouter.get('/:polygon_id', async (request, response) => {
  const lockersRepository = getRepository(Locker);
  const lockers = await lockersRepository.find({
    where: { polygon_id: request.params.polygon_id },
  });
  return response.json(lockers);
});

lockersRouter.post('/', async (request, response) => {
  const { polygon_id, lockers } = request.body;

  const createLockers = new CreateLockersService();

  const createdLockers = await createLockers.execute({
    polygon_id,
    lockers,
  });

  return response.json(createdLockers);
});

export default lockersRouter;
