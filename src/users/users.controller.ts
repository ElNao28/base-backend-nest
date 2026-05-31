import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { ROLES } from '../auth/decorators/roles.decorator';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { DeleteUserDto } from './dto/delete-user-response.dto';
import { User } from '../auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  @Authorization(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER)
  @Get(':id')
  public getUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    return this.usersService.getUserById(idUser);
  }

  @ApiOkResponse({
    type: DeleteUserDto,
  })
  @Authorization(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Delete('delete/:id')
  public deleteUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    return this.usersService.deleteUserById(idUser);
  }

  @ApiProperty({
    type: UpdateUserResponseDto,
  })
  @Authorization()
  @Patch('update')
  public updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @User('sub') idUser: string,
  ) {
    return this.usersService.updateUser(updateUserDto, idUser);
  }

  @ApiOkResponse({
    type: GetUsersResponseDto,
  })
  @Authorization(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Get()
  public getUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.getUsers(paginationDto);
  }
}
