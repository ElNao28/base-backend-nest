import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  message: string;

  @IsEmail()
  destiny: string;
}
