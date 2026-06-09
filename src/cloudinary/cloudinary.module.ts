import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvide } from './providers/cloudinary.provide';

@Module({
  controllers: [],
  providers: [CloudinaryService, CloudinaryProvide],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
