import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

export class DeleteUserDto extends BodyResponseDto {
  @ApiProperty()
  data: boolean;
}
