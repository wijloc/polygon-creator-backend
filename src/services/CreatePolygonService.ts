import { getRepository } from 'typeorm';
import Polygon from '../models/Polygon';

interface Request {
  area: string;
  name: string;
  points: {
    lat: string;
    lng: string;
  };
}

class CreatePolygonService {
  public async execute({ area, name, points }: Request): Promise<Polygon> {
    const polygonsRepository = getRepository(Polygon);

    const polygon = polygonsRepository.create({
      name,
      area,
      points,
    });

    await polygonsRepository.save(polygon);

    return polygon;
  }
}

export default CreatePolygonService;
