import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from './rol.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';

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
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
