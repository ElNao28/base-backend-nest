import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../common/dto/body-response.dto';

class UploadImageToCloudinaryDto {
  @ApiProperty()
  publicId: string;
  @ApiProperty()
  secureUrl: string;
}

export class UploadImageToCloudinaryResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: UploadImageToCloudinaryDto;
}
