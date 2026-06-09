import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvide: Provider = {
  provide: 'cloudinary',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get<string>('cloudinary.CLOUD_NAME'),
      api_key: configService.get<string>('cloudinary.CLOUD_API_KEY'),
      api_secret: configService.get<string>('cloudinary.CLOUD_API_SECRET'),
    });
  },
  inject: [ConfigService],
};
