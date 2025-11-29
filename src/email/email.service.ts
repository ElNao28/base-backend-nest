import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  public async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      await this.transporter.sendMail({
        from: `${process.env.EMAIL}`,
        to: sendEmailDto.destiny,
        subject: 'Hello world :D',
        html: `
        <h1>${sendEmailDto.message}</h1>
        `,
      });
      return {
        message: 'Email send',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
