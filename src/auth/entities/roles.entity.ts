import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
