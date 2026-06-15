import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappProvider } from './providers/whatsapp.provider';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService, WhatsappProvider],
})
export class WhatsappModule {}
