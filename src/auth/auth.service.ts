import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HandlerDataBaseErrors } from 'src/common/helpers/handler-database-errors.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param createUserDto - data with the infomation for the new user(firstName, email, phone...)
   * @returns returns the new user created
   */
  public async createNewUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
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
      const users = await this.userRepository.find({
        relations:['roles']
      });
      return users;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  /**
   *
   * @param id - User ID of the user who made the query
   * @returns returns one user if exists
   */
  public async getUserById(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    return foundUser;
  }

  /**
   *
   * @param id - id of the user deleted
   * @returns returns empy data
   */
  public async deleteUserById(id: string) {
    const deletedUser = await this.userRepository.softDelete({ id });

    if (deletedUser.affected === 0)
      throw new ConflictException(`Can't delete user with: ${id}`);

    return deletedUser;
  }

  /**
   *
   * @param id - id of the user to update data
   * @param updateUserDto - data with information to update
   * @returns returns data of user updated
   */
  public async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!updateUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    try {
      const saveUser = await this.userRepository.save(updateUser);
      return saveUser;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  public async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        firtsname: true,
        lastname: true,
        secondLastname: true,
        email: true,
        phone: true,
        password: true,
        isActive: true,
      },
    });

    if (!foundUser)
      throw new NotFoundException(`User with email: ${email} not found`);

    if (!foundUser.isActive)
      throw new ForbiddenException(`User inactive, Please contact with admin`);

    if (!bcrypt.compareSync(password, foundUser.password))
      throw new UnauthorizedException(`Password incorrect`);

    const { password: _, ...payload } = foundUser;

    const token = this.jwtService.sign(payload);

    return {
      token,
      message: 'Login success',
    };
  }

  public async createRole(createRoleDto: CreateRoleDto) {
    try {
      const newRole = this.roleRepository.create(createRoleDto);

      return await this.roleRepository.save(newRole);
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }
}
