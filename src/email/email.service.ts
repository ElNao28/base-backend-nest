import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailBody } from './interfaces/email-body.interface';
import { NODEMAILER } from './providers/nodemailer-transporter.provider';

@Injectable()
export class EmailService {
  constructor(
    @Inject(NODEMAILER)
    private readonly nodemailerTrasport: nodemailer.Transporter,
    private readonly configService: ConfigService,
  ) {}

  public async sendEmail(emailBody: EmailBody) {
    return await this.nodemailerTrasport.sendMail({
      from: this.configService.get<string>('nodemailer.NODEMAILER_USER'),
      ...emailBody,
    });
  }
}
