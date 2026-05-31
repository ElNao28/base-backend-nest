import { HttpStatus } from '@nestjs/common';

export class HandlerSuccessResponse<T> {
  constructor(
    public readonly message: string = 'Operation success',
    public readonly statusCode: HttpStatus = HttpStatus.OK,
    public readonly data: T | boolean = true,
  ) {}

  public static successResponse<T>(
    data?: T,
    message: string = 'Operation success',
    statusCode: HttpStatus = HttpStatus.OK,
  ): HandlerSuccessResponse<T> {
    return new HandlerSuccessResponse<T>(message, statusCode, data ?? true);
  }
}
