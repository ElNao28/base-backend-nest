import { ApiProperty } from '@nestjs/swagger';

export class BodyResponseDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
