import { ApiProperty } from '@nestjs/swagger';

export class SendWhatsappMessageDto {
  @ApiProperty({
    type: 'number',
  })
  destinyNumber: number;

  @ApiProperty({
    type: 'string',
  })
  message: string;
}
