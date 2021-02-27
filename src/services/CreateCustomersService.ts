import { getRepository } from 'typeorm';
import Customer from '../models/Customer';

interface Request {
  polygon_id: string;
  customers: [
    {
      lat: string;
      lng: string;
    },
  ];
}

class CreateCustomersService {
  public async execute({
    polygon_id,
    customers,
  }: Request): Promise<Customer[]> {
    const customersRepository = getRepository(Customer);

    const createdCustomers = customers.map(customer => {
      return customersRepository.create({
        polygon_id,
        lat: customer.lat,
        lng: customer.lng,
      });
    });

    await customersRepository.save(createdCustomers);

    return createdCustomers;
  }
}

export default CreateCustomersService;
