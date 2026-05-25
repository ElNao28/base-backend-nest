import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadJwt } from '../interfaces/payload-jwt.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const jwtData: PayloadJwt = request.user;

    if (!jwtData) throw new UnauthorizedException();

    const hasRole = roles.some((rol) => rol === jwtData.rol.id);

    if (!hasRole)
      throw new UnauthorizedException(
        'The user does not have sufficient permissions',
      );

    return true;
  }
}
