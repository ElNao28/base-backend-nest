import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @ApiProperty()
  message: string;

  @IsEmail()
  @ApiProperty()
  destiny: string;
}
