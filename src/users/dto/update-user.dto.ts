import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  secondLastname?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
