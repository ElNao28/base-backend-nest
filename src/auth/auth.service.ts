import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   *
   * @param createUserDto - data with the infomation for the new user(firstName, email, phone...)
   * @returns returns the new user created
   */
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

  /**
   *
   * @returns returns an array with all users
   */
  public async getAllUsers() {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  /**
   * 
   * @param id - Id of user that consulted
   * @returns returns one user if exists
   */
  public async getUserById(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    return foundUser;
  }

  
}
