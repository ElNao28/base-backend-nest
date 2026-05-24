import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  EXPIRES_TIME_ACCESS_TOKEN: process.env.EXPIRES_TIME_ACCESS_TOKEN ?? '15m',
  EXPIRES_TIME_REFRESH_TOKEN: process.env.EXPIRES_TIME_REFRESH_TOKEN ?? '5d',
  PRIVATE_KEY_ACCESS_TOKEN:
    process.env.PRIVATE_KEY_ACCESS_TOKEN ?? 'accessKey123*',
  PRIVATE_KEY_REFRESH_TOKEN:
    process.env.PRIVATE_KEY_REFRESH_TOKEN ?? 'refressKey123*',
}));
