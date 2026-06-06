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
import { RefreshToken } from './entities/refresh-token.entity';
import ms from 'ms';
import { randomUUID } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { password, rolId, ...userData } = registerUserDto;

    const roundsHash = this.configService.get<number>(
      'auth.ROUND_HASH_PASSWORD',
    )!;
    const passwordHash = await bcrypt.hash(password, +roundsHash);

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
        rol: true,
      },
      relations: ['rol'],
    });

    if (!foundUser)
      throw new UnauthorizedException('Email or password incorrect');

    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword)
      throw new UnauthorizedException('Email or password incorrect');

    const tokens = await this.generateTokensFromSignIn(foundUser);

    return HandlerSuccessResponse.successResponse<GenerateTokens>(tokens);
  }

  private async generateTokensFromSignIn(user: User): Promise<GenerateTokens> {
    const { id: sub, email, rol } = user;
    const jti = randomUUID();
    const payload: PayloadJwt = {
      sub,
      email,
      jti,
      rol,
    };

    const {
      EXPIRES_TIME_ACCESS_TOKEN,
      PRIVATE_KEY_ACCESS_TOKEN,
      EXPIRES_TIME_REFRESH_TOKEN,
      PRIVATE_KEY_REFRESH_TOKEN,
    } = this.configService.get<JwtConfig>('jwt')!;

    const tokens: GenerateTokens = {
      accessToken: this.generateJwtAccesssToken(
        payload,
        PRIVATE_KEY_ACCESS_TOKEN,
        EXPIRES_TIME_ACCESS_TOKEN,
      ),
      refreshToken: this.generateJwtRefreshToken(
        payload,
        PRIVATE_KEY_REFRESH_TOKEN,
        EXPIRES_TIME_REFRESH_TOKEN,
      ),
    };

    await this.saveRefreshToken(
      tokens.refreshToken,
      user,
      jti,
      EXPIRES_TIME_REFRESH_TOKEN,
    );

    return tokens;
  }

  public async regenerateAccessToken(queryToken: string) {
    const {
      PRIVATE_KEY_REFRESH_TOKEN,
      PRIVATE_KEY_ACCESS_TOKEN,
      EXPIRES_TIME_ACCESS_TOKEN,
    } = this.configService.get<JwtConfig>('jwt')!;

    let refreshToken: PayloadJwt | null = null;

    try {
      refreshToken = this.jwtService.verify<PayloadJwt>(queryToken, {
        secret: PRIVATE_KEY_REFRESH_TOKEN,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const foundToken = await this.refreshTokenRepository.findOne({
      where: {
        jti: refreshToken.jti,
        revoked: false,
        status: true,
      },
    });

    if (!foundToken) throw new UnauthorizedException('Token expired');

    const matchToken = await bcrypt.compare(queryToken, foundToken.tokenHash);

    if (!matchToken) throw new UnauthorizedException('Invalid token');

    const user = await this.userRepository.findOne({
      where: { id: refreshToken.sub, status: true },
      relations: ['rol'],
    });

    if (!user) throw new UnauthorizedException('Token expired');

    const payload: PayloadJwt = {
      sub: user.id,
      email: user.email,
      jti: randomUUID(),
      rol: user.rol,
    };

    const newAccessToken = this.generateJwtAccesssToken(
      payload,
      PRIVATE_KEY_ACCESS_TOKEN,
      EXPIRES_TIME_ACCESS_TOKEN,
    );

    return HandlerSuccessResponse.successResponse<{ accessToken: string }>({
      accessToken: newAccessToken,
    });
  }

  private generateJwtAccesssToken(
    payload: PayloadJwt,
    secretKey: string,
    expiresTime: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: expiresTime as any,
    });
  }

  private generateJwtRefreshToken(
    { sub, jti }: PayloadJwt,
    secretKey: string,
    expiresTime: string,
  ): string {
    return this.jwtService.sign(
      { sub, jti },
      {
        secret: secretKey,
        expiresIn: expiresTime as any,
      },
    );
  }

  private async saveRefreshToken(
    refreshToken: string,
    user: User,
    jti: string,
    timeExpiration: string,
  ): Promise<void> {
    try {
      const roundsHash = this.configService.get<number>('auth.ROUND_HASH_JWT')!;
      const tokenHash = await bcrypt.hash(refreshToken, +roundsHash);
      const expiresAt = new Date(Date.now() + ms(timeExpiration as any));

      const newRefreshToken = this.refreshTokenRepository.create({
        tokenHash,
        user,
        jti,
        expiresAt,
      });

      await this.refreshTokenRepository.save(newRefreshToken);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
