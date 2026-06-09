import { registerAs } from '@nestjs/config';

export default registerAs('nodemailer', () => ({
  NODEMAILER_USER: process.env.NODEMAILER_USER ?? '',
  NODEMAILER_PASS: process.env.NODEMAILER_PASS ?? '',
}));
