import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from './body-response.dto';

export class BooleanResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: boolean;
}
