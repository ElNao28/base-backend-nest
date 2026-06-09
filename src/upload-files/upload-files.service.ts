import {
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { extname, join } from 'path';
import { cwd } from 'process';
import { v4 as uuid } from 'uuid';
import { createReadStream, existsSync, promises as fsp } from 'fs';
import { lookup } from 'mime-types';
import { HandlerSuccessResponse } from '../common/utils/handler-success-response';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UploadFilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  public async uploadFile(file: Express.Multer.File) {
    const uploadsDir = join(cwd(), 'uploads');

    await fsp.mkdir(uploadsDir, { recursive: true });

    const extension =
      extname(file.originalname) || `.${file.mimetype.split('/')[1]}`;

    const fileName = `${uuid()}${extension}`;
    const filePath = join(uploadsDir, fileName);

    await fsp.writeFile(filePath, file.buffer);

    return HandlerSuccessResponse.successResponse({ fileName });
  }

  public getImageByName(name: string): StreamableFile {
    const filePath = join(cwd(), 'uploads', name);

    if (!existsSync(filePath)) {
      throw new NotFoundException();
    }

    const file = createReadStream(filePath);
    const mimeType = lookup(extname(filePath)) || 'application/octet-stream';

    return new StreamableFile(file, {
      type: mimeType,
      disposition: `inline; filename="${name}"`,
    });
  }

  public async uploadImageToCloudinary(file: Express.Multer.File) {
    try {
      const uploadedImage =
        await this.cloudinaryService.uploadImageToCloudinary(file);

      const successResponse = {
        publicId: uploadedImage.public_id,
        secureUrl: uploadedImage.secure_url,
      };

      return HandlerSuccessResponse.successResponse(successResponse);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        'Could not upload image to Cloudinary',
      );
    }
  }

  public async deleteImageFromCloudinary(publicId: string) {
    try {
      const deleteImage =
        await this.cloudinaryService.deleteImageFromCloudinary(publicId);

      if (deleteImage.result === 'not found') {
        throw new NotFoundException('Image not found');
      }

      return HandlerSuccessResponse.successResponse(true);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.log(error);

      throw new ServiceUnavailableException(
        'Could not delete image from Cloudinary',
      );
    }
  }
}
