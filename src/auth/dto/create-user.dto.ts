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
  firtsname: string;

  @IsString()
  @MinLength(3)
  lastname: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  secondLastname: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsInt({
    each: true,
  })
  @IsArray()
  roles: number[];
}
