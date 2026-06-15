import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  public async uploadImageToCloudinary(
    file: Express.Multer.File,
    folder: string = 'images',
  ) {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error('Upload result undefined'));
            return;
          }

          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  public async deleteImageFromCloudinary(publicId: string) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }
}
