import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

export class ResponseRegisterUserDto extends BodyResponseDto {
  @ApiProperty({
    nullable: true,
  })
  data: any;
}
