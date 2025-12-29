import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { diskStorage } from 'multer';
import { FileNamer } from './helpers/fileNamer.helper';
import type { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './file-upload.dto';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image upload',
    type: FileUploadDto,
  })
  @Auth()
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: FileNamer,
      }),
    }),
  )
  @ApiBearerAuth()
  public uploadImages(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('image/path/:path')
  public getImage(@Res() res: Response, @Param('path') path: string) {
    return this.uploadFilesService.getImageByPath(path, res);
  }
}
