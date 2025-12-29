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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserDto,
  })
  @Post('users/register')
  public createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewUser(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [CreateUserDto],
  })
  @ApiBearerAuth()
  @Auth()
  @Get('users')
  public getAllUsers() {
    return this.authService.getAllUsers();
  }

  @ApiResponse({
    status: 200,
    description: 'User details',
    type: CreateUserDto,
  })
  @ApiBearerAuth()
  @Auth()
  @Get('users/:id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiBearerAuth()
  @Auth()
  @Delete('users/:id')
  public deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deleteUserById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: CreateUserDto,
  })
  @Auth()
  @ApiBearerAuth()
  @Patch('users/update/:id')
  public updateUserById(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUserById(id, updateUserDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: CreateRoleDto,
  })
  @Auth(ValidRoles.Admin)
  @ApiBearerAuth()
  @Post('role')
  public createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.authService.createRole(createRoleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'JWT token for authentication' },
        message: { type: 'string', description: 'Login status message' },
      },
      example: {
        token: 'string',
        message: 'Login successful',
      },
    },
  })
  @Post('login')
  public loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
