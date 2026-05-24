import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  ROUNDS_HASH: process.env.ROUNDS_HASH ?? 8,
}));
