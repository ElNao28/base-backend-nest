import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty({ nullable: true })
  secondLastname?: string;
  @ApiProperty()
  birthdate: Date;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty()
  deleteAt: Date;
}
export class GetUsersResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: User;
}
