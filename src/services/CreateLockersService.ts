import { getRepository } from 'typeorm';
import Locker from '../models/Locker';

interface Request {
  polygon_id: string;
  lockers: [
    {
      lat: string;
      lng: string;
    },
  ];
}

class CreateLockersService {
  public async execute({ polygon_id, lockers }: Request): Promise<Locker[]> {
    const lockersRepository = getRepository(Locker);

    await lockersRepository.delete({ polygon_id });

    const createdLockers = lockers.map(locker => {
      return lockersRepository.create({
        polygon_id,
        lat: locker.lat,
        lng: locker.lng,
      });
    });

    await lockersRepository.save(createdLockers);

    return createdLockers;
  }
}

export default CreateLockersService;
