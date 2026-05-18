import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
  })
  lastname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'second_lastname',
    nullable: true,
  })
  secondLastname?: string;

  @ApiProperty()
  @Column({
    type: 'date',
  })
  birthdate: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  phone: string;

  @ApiProperty()
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

  @ApiProperty()
  @Column({
    default: true,
  })
  status: boolean;

  @ApiProperty()
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;
}
