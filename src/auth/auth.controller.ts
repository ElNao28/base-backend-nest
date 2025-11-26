import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesGuard } from './guards/user-roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  public createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }

  @UseGuards(AuthGuard(), UserRolesGuard)
  @Get('users')
  public getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('users/:id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserById(id);
  }

  @Delete('users/:id')
  public deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deleteUserById(id);
  }

  @Patch('users/update/:id')
  public updateUserById(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUserById(id, updateUserDto);
  }

  @Post('role')
  public createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.authService.createRole(createRoleDto);
  }

  @Post('login')
  public loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
