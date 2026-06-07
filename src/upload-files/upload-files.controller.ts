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
import { UploadImageResponse } from './dto/upload-image-response.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';

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
