import { ApiProperty } from '@nestjs/swagger';
import { BodyResponseDto } from '../../../common/dto/body-response.dto';

class GetQrCodeDto {
  @ApiProperty()
  qrCode: string;
}

export class GetQrCodeResponseDto extends BodyResponseDto {
  @ApiProperty()
  data: GetQrCodeDto;
}
