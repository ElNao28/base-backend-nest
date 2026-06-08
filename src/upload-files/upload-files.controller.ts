import {
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { Public } from '../auth/decorators/public-decorator.decorator';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { UploadImageToCloudinaryResponseDto } from './dto/upload-image-to-cloudinary-response.dto';
import { UploadImageResponse } from './dto/responses/upload-image-response.dto';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Authorization()
  @ApiOkResponse({
    type: UploadImageResponse,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-image')
  public uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadFilesService.uploadFile(file);
  }

  @Authorization()
  @ApiOkResponse({
    type: UploadImageToCloudinaryResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('cloudinary')
  public uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFilesService.uploadImageToCloudinary(file);
  }

  @Public()
  @ApiResponse({
    status: 200,
    description: 'Returns an image file',
    content: {
      'application/octet-stream': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Get('image/:path')
  public getImageByName(@Param('path') path: string) {
    return this.uploadFilesService.getImageByName(path);
  }
}
