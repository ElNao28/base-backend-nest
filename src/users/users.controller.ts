import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { ROLES } from '../auth/decorators/roles.decorator';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { DeleteUserDto } from './dto/delete-user-response.dto';

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
  @Authorization(ROLES.SUPER_ADMIN)
  @Delete('delete/:id')
  public deleteUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    return this.usersService.deleteUserById(idUser);
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
