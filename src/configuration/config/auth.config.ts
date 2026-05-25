import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  ROUND_HASH_PASSWORD: process.env.ROUND_HASH_PASSWORD ?? 8,
  ROUND_HASH_JWT: process.env.ROUND_HASH_JWT ?? 10,
}));
