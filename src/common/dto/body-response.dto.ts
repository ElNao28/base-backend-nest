import { ApiProperty } from '@nestjs/swagger';

export class BodyResponseDto {
  @ApiProperty()
  statusCode: string;
  @ApiProperty()
  message: string;
}
