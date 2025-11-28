import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { UploadFilesController } from './upload-files.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UploadFilesController],
  providers: [UploadFilesService,],
  imports: [AuthModule],
})
export class UploadFilesModule {}
