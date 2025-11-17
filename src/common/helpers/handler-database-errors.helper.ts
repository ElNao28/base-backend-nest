import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export const HandlerDataBaseErrors = (error: any) => {
  console.log(error);

  if (error.code && error.code === '23505')
    throw new ConflictException(error.detail);

  throw new InternalServerErrorException(
    'An error occurred; please check the server logs.',
  );
};
