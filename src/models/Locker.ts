import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Polygon from './Polygon';

@Entity('lockers')
class Locker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  polygon_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Polygon, polygon => polygon.points)
  @JoinColumn({ name: 'polygon_id' })
  polygon: Polygon;
}

export default Locker;
