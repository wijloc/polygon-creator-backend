import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCustomersService from '../services/CreateCustomersService';

import Customer from '../models/Customer';

const customersRouter = Router();

customersRouter.get('/:polygon_id/:day', async (request, response) => {
  const customersRepository = getRepository(Customer);
  const customers = await customersRepository.find({
    where: {
      polygon_id: request.params.polygon_id,
      day: request.params.day,
    },
  });
  return response.json(customers);
});

customersRouter.get('/', async (request, response) => {
  const customersRepository = getRepository(Customer);
  const customers = await customersRepository.find();
  return response.json(customers);
});

customersRouter.post('/', async (request, response) => {
  const { polygon_id, customers, day } = request.body;

  const createCustomers = new CreateCustomersService();

  const createdCustomers = await createCustomers.execute({
    polygon_id,
    customers,
    day,
  });

  return response.json(createdCustomers);
});

export default customersRouter;
