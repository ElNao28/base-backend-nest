import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import authConfiguration from './config/auth.config';
import jwtConfiguration from './config/jwt.config';
import cloudinaryConfiguration from './config/cloudinary.config';
import nodemailerConfiguration from './config/nodemailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfiguration,
        jwtConfiguration,
        cloudinaryConfiguration,
        nodemailerConfiguration,
      ],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
