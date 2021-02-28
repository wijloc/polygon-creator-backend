import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateLockersService from '../services/CreateLockersService';

import Locker from '../models/Locker';

const lockersRouter = Router();

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
