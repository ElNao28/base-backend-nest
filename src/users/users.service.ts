import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { HandlerSuccessResponse } from '../common/utils/handler-success-response';
import { handleDatabaseErrors } from '../common/utils/handler-db-error';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getUsers(paginationDto: PaginationDto) {
    const { limit, offset, orderBy } = paginationDto;
    const users = await this.userRepository.find({
      where: {
        status: true,
      },
      take: limit,
      skip: (offset - 1) * limit,
      order: {
        createAt: orderBy,
      },
    });
    return HandlerSuccessResponse.successResponse<User[]>(users);
  }

  public async getUserById(idUser: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: idUser,
        status: true,
      },
      relations: ['rol'],
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return HandlerSuccessResponse.successResponse<User>(foundUser);
  }

  public async updateUser(updateUserDto: UpdateUserDto, idUser: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id: idUser, status: true },
    });
    if (!foundUser) throw new NotFoundException('User not found');
    try {
      await this.userRepository.update(idUser, updateUserDto);
      return HandlerSuccessResponse.successResponse<boolean>(true);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  public async deleteUserById(idUser: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: idUser,
      },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    try {
      await this.userRepository.softDelete({ id: idUser });
      return HandlerSuccessResponse.successResponse<boolean>(true);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
