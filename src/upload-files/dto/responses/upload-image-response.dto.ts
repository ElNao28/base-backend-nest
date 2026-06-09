import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../../common/dto/body-response.dto';

class UploadImageDto {
  @ApiProperty({
    type: 'string',
  })
  fileName: string;
}

export class UploadImageResponse extends BodyResponseDto {
  @ApiProperty()
  data: UploadImageDto;
}
