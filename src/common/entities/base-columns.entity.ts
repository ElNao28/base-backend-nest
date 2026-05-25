import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseColumns {
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
}
