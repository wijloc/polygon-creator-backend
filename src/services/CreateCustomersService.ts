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
  day: number;
}

class CreateCustomersService {
  public async execute({
    polygon_id,
    customers,
    day,
  }: Request): Promise<Customer[]> {
    const customersRepository = getRepository(Customer);

    await customersRepository.delete({ polygon_id, day });

    const createdCustomers = customers.map(customer => {
      return customersRepository.create({
        polygon_id,
        lat: customer.lat,
        lng: customer.lng,
        day,
      });
    });

    await customersRepository.save(createdCustomers);

    return createdCustomers;
  }
}

export default CreateCustomersService;
