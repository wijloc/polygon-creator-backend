import { getRepository } from 'typeorm';
import Point from '../models/Point';

interface Request {
  lat: string;
  lng: string;
  order: number;
  polygon_id: string;
}

class CreatePointService {
  public async execute({
    lat,
    lng,
    order,
    polygon_id,
  }: Request): Promise<Point> {
    const pointsRepository = getRepository(Point);

    const polygon = pointsRepository.create({
      lat,
      lng,
      order,
      polygon_id,
    });

    await pointsRepository.save(polygon);

    return polygon;
  }
}

export default CreatePointService;
