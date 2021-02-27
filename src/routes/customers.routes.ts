import { Router } from 'express';

import CreateCustomersService from '../services/CreateCustomersService';

const customersRouter = Router();

customersRouter.post('/', async (request, response) => {
  const { polygon_id, customers } = request.body;

  const createCustomers = new CreateCustomersService();

  const createdCustomers = await createCustomers.execute({
    polygon_id,
    customers,
  });

  return response.json(createdCustomers);
});

export default customersRouter;
