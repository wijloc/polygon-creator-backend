import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Polygon from './Polygon';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  polygon_id: string;

  @Column()
  day: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Polygon, polygon => polygon.points)
  @JoinColumn({ name: 'polygon_id' })
  polygon: Polygon;
}

export default Customer;
