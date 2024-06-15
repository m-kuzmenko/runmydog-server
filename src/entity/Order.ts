import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  walkerId: number;

  @Column()
  orderStatus: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
