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
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './decorators/authorize.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  public createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }

  @Auth()
  @Get('users')
  public getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Auth()
  @Get('users/:id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserById(id);
  }

  @Auth()
  @Delete('users/:id')
  public deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deleteUserById(id);
  }

  @Auth()
  @Patch('users/update/:id')
  public updateUserById(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUserById(id, updateUserDto);
  }

  @Auth(ValidRoles.Admin)
  @Post('role')
  public createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.authService.createRole(createRoleDto);
  }

  @Post('login')
  public loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
