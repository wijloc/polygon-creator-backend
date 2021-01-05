import { DeleteResult, getRepository } from 'typeorm';
import Polygon from '../models/Polygon';

interface Request {
  id: string;
}

class DeletePointService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const pointsRepository = getRepository(Polygon);

    const deleteResult = await pointsRepository.delete({
      id,
    });
    return deleteResult;
  }
}

export default DeletePointService;
