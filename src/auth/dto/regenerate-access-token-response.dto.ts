import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

class RegenerateAccessToken {
  @ApiProperty()
  accessToken: string;
}

export class RegenerateAccessTokenResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: RegenerateAccessToken;
}
