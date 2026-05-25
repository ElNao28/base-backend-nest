import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';
import { UserDto } from './user.dto';

export class GetUsersResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: UserDto;
}
