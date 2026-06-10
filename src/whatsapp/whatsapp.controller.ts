import { Body, Controller, Get, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetQrCodeResponseDto } from './dto/responses/get-qr-code-response.dto';
import { SendWhatsappMessageDto } from './dto/send-whatsapp-message.dto';
import { BooleanResponseDto } from '../common/dto/boolean-response.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Authorization()
  @ApiOkResponse({
    type: GetQrCodeResponseDto,
  })
  @Get('qr')
  public generateWhatsappQr() {
    return this.whatsappService.generateQr();
  }

  @Authorization()
  @ApiOkResponse({
    type: BooleanResponseDto,
  })
  @Post('send-message')
  public sendMessage(@Body() sendWhatsappMessageDto: SendWhatsappMessageDto) {
    return this.whatsappService.sendWhatsapp(sendWhatsappMessageDto);
  }
}
