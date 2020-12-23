import { getRepository } from 'typeorm';
import Point from '../models/Point';

interface Request {
  lat: string;
  lng: string;
  polygon_id: string;
}

class CreatePointService {
  public async execute({ lat, lng, polygon_id }: Request): Promise<Point> {
    const pointsRepository = getRepository(Point);

    const polygon = pointsRepository.create({
      lat,
      lng,
      polygon_id,
    });

    await pointsRepository.save(polygon);

    return polygon;
  }
}

export default CreatePointService;
