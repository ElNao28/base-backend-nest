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

/**
 * Guard responsible for validating user authorization based on roles.
 *
 * This guard reads the roles defined through the `@Roles()` decorator
 * and verifies whether the authenticated user has at least one of the
 * required roles to access the requested resource.
 *
 * The authenticated user information must be available in `request.user`,
 * typically populated by a previous authentication guard.
 *
 * If no roles are defined for the route or controller, access is granted.
 *
 * @implements {CanActivate}
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  /**
   * Creates an instance of AuthorizationGuard.
   *
   * @param reflector - Utility service used to retrieve metadata
   * associated with routes and controllers.
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * Determines whether the current request can proceed.
   *
   * The guard performs the following validations:
   * 1. Retrieves the roles defined with the `@Roles()` decorator.
   * 2. Grants access if no roles are required.
   * 3. Verifies that an authenticated user exists in `request.user`.
   * 4. Checks whether the user's role matches any of the allowed roles.
   *
   * @param context - Current execution context.
   *
   * @returns `true` when the user is authorized to access the resource.
   *
   * @throws {UnauthorizedException}
   * Thrown when the user is not authenticated.
   *
   * @throws {UnauthorizedException}
   * Thrown when the user does not have any of the required roles.
   */
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
