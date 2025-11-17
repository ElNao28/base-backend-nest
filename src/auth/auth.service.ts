import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HandlerDataBaseErrors } from 'src/common/helpers/handler-database-errors.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createNewUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...newUser } = createUserDto;
      const hashPassword = bcrypt.hashSync(
        password,
        process.env.ROUNDS_HASH ? +process.env.ROUNDS_HASH : 8,
      );

      const user = this.userRepository.create({
        ...newUser,
        password: hashPassword,
      });

      const saveUser = await this.userRepository.save(user);
      return saveUser;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }
}
