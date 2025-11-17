import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  public createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }

  @Get('users')
  public getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('users/:id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserById(id);
  }
}
