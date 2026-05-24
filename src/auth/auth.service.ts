import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from '../configuration/interfaces/jwt.config.interface';
import { PayloadJwt } from './interfaces/payload-jwt.interface';
import { GenerateTokens } from './interfaces/generate-tokens.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  public async loginUser(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!foundUser)
      throw new UnauthorizedException('Email or password incorrect');

    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword)
      throw new UnauthorizedException('Email or password incorrect');
    return HandlerSuccessResponse.successResponse<GenerateTokens>(
      this.generateTokensFromSignIn(foundUser),
    );
  }

  private generateTokensFromSignIn(user: User): GenerateTokens {
    const { id: sub, email } = user;
    const payload: PayloadJwt = {
      sub,
      email,
    };

    const {
      EXPIRES_TIME_ACCESS_TOKEN,
      PRIVATE_KEY_ACCESS_TOKEN,
      EXPIRES_TIME_REFRESH_TOKEN,
      PRIVATE_KEY_REFRESH_TOKEN,
    } = this.configService.get<JwtConfig>('jwt')!;

    return {
      accessToken: this.generateJwtToken(
        payload,
        PRIVATE_KEY_ACCESS_TOKEN,
        EXPIRES_TIME_ACCESS_TOKEN,
      ),
      refreshToken: this.generateJwtToken(
        payload,
        PRIVATE_KEY_REFRESH_TOKEN,
        EXPIRES_TIME_REFRESH_TOKEN,
      ),
    };
  }

  private generateJwtToken(
    payload: PayloadJwt,
    secretKey: string,
    expiresTime: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: expiresTime as any,
    });
  }
}
