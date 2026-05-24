import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Rol } from '../users/entities/rol.entity';
import { HandlerSuccessResponse } from '../common/utils/handler-success-response';
import { handleDatabaseErrors } from '../common/utils/handler-db-error';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    private readonly configService: ConfigService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { password, rolId, ...userData } = registerUserDto;

    const roundsHash = this.configService.get<number>('auth.ROUNDS_HASH')!;
    const passwordHash = await bcrypt.hash(password, roundsHash);

    const foundUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { phone: userData.phone }],
    });

    if (foundUser) throw new ConflictException('Email or phone exist');

    const rol = await this.rolRepository.findOneBy({ id: rolId ?? 1 });

    if (!rol) throw new NotFoundException('Rol not found');

    try {
      const newUser = this.userRepository.create({
        ...userData,
        password: passwordHash,
        rol: rol,
      });

      await this.userRepository.save(newUser);

      return HandlerSuccessResponse.successResponse();
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
