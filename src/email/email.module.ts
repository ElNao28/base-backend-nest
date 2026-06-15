import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { NodemailerTransporterProvider } from './providers/nodemailer-transporter.provider';

@Module({
  controllers: [EmailController],
  providers: [EmailService, NodemailerTransporterProvider],
})
export class EmailModule {}
