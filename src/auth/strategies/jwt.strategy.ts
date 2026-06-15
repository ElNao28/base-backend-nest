import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../../configuration/interfaces/jwt.config.interface';
import { Injectable } from '@nestjs/common';

/**
 * Passport strategy responsible for validating JWT access tokens.
 *
 * This strategy extracts the JWT from the request `Authorization` header
 * using the Bearer token format and validates it using the configured
 * access token private key.
 *
 * Once the token is successfully validated, the decoded payload is attached
 * to the request as `request.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of JwtStrategy.
   *
   * @param configService - Service used to access application configuration values.
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>('jwt', {
        infer: true,
      }).PRIVATE_KEY_ACCESS_TOKEN,
    });
  }

  /**
   * Validates the decoded JWT payload.
   *
   * The returned value is automatically attached to the request object
   * as `request.user` by Passport.
   *
   * @param payload - Decoded JWT payload.
   * @returns The decoded JWT payload.
   */
  async validate(payload: any) {
    return payload;
  }
}
