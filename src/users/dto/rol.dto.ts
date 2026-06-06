import { ApiProperty } from '@nestjs/swagger';

export class RolDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty()
  deleteAt: Date;
}
