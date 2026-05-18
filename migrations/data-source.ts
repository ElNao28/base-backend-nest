import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';

dotenv.config({ quiet: true });

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(cwd(), '/../**/*.entity{.ts,.js}')],
  migrations: [join(cwd(), '/migrations/sql/*{.ts,.js}')],
  synchronize: false,
});
