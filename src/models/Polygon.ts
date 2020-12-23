import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Point from './Point';

@Entity('polygons')
class Polygon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  area: string;

  @Column()
  name: string;

  @OneToMany(() => Point, point => point.polygon)
  points: Point;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Polygon;
