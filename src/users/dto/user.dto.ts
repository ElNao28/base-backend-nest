import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
