import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'second_lastname',
    nullable: true,
  })
  secondLastname?: string;

  @Column({
    type: 'date',
  })
  birthdate: Date;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    default: true,
  })
  status: boolean;

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;

  @ManyToOne(() => Rol, (rol) => rol.user)
  rol: Rol;
}
