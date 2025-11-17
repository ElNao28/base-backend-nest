import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  firtsname: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'second_lastname',
  })
  secondLastname?: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false,
  })
  password: string;
}
