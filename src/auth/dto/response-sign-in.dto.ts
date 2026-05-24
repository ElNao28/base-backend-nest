import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

class DataSignIn {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

export class ResponseSignInDto extends BodyResponseDto {
  @ApiProperty()
  data: DataSignIn;
}
