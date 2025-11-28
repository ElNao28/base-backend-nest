import { v4 as uuidv4 } from 'uuid';

export const FileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuidv4()}.${fileExtension}`;

  cb(null, fileName);
};
