import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'base123',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_DB: process.env.POSTGRES_DB || 'base_backend',
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
}));
