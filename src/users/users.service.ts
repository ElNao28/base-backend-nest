import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { HandlerSuccessResponse } from '../common/utils/handler-success-response';

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
}
