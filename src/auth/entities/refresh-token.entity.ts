import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseColumns } from '../../common/entities/base-columns.entity';

@Entity('refresh_token')
export class RefreshToken extends BaseColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenHash: string;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
