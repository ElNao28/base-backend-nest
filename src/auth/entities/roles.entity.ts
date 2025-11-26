import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @DeleteDateColumn({
    name: 'delete_at',
    select: false,
  })
  deleteAt?: Date;

  @OneToMany(() => User, (user) => user.roles)
  user: User;
}
