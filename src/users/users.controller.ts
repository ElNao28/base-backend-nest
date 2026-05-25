import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { ROLES } from '../auth/decorators/roles.decorator';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: GetUserByIdResponseDto,
  })
  @Authorization(ROLES.SUPER_ADMIN, ROLES.SUPER_ADMIN, ROLES.USER)
  @Get(':id')
  public getUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    return this.usersService.getUserById(idUser);
  }

  @ApiOkResponse({
    type: GetUsersResponseDto,
  })
  @Authorization(ROLES.SUPER_ADMIN, ROLES.SUPER_ADMIN)
  @Get()
  public getUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.getUsers(paginationDto);
  }
}
