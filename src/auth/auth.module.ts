import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_KEY,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRE_TIME
              ? (process.env.JWT_EXPIRE_TIME as any)
              : '60s',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
