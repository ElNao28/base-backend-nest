import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

export class UpdateUserResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: boolean;
}
