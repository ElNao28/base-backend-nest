import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  firtsname: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  lastname: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty()
  secondLastname: string;

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(10)
  @ApiProperty()
  phone: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive: boolean;

  @IsInt({
    each: true,
  })
  @IsArray()
  @ApiProperty({
    type: [Number],
  })
  roles: number[];
}
