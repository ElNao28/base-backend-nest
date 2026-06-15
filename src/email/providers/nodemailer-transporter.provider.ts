import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export const NODEMAILER = 'NODEMAILER';

export const NodemailerTransporterProvider: Provider = {
  provide: NODEMAILER,
  useFactory: (configService: ConfigService) => {
    return nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: configService.get<string>('nodemailer.NODEMAILER_USER'),
        pass: configService.get<string>('nodemailer.NODEMAILER_PASS'),
      },
    });
  },
  inject: [ConfigService],
};
