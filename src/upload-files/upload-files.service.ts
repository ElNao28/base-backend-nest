import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

@Injectable()
export class UploadFilesService {
  public getImageByPath(path: string, res: Response) {
    const directoryFile = join(cwd(), 'uploads', path);

    if (!existsSync(directoryFile))
      throw new NotFoundException(
        `The file with the path ${path} does not exist`,
      );

    return res.sendFile(directoryFile);
  }
}
