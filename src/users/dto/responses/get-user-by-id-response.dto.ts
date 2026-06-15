import { ApiProperty } from '@nestjs/swagger';
import { RolDto } from '../rol.dto';
import { UserDto } from '../user.dto';

export class UserWithRolDto extends UserDto {
  @ApiProperty()
  rol: RolDto;
}

export class GetUserByIdResponseDto {
  @ApiProperty()
  data: UserWithRolDto;
}
