import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public-decorator.decorator';

/**
 * Guard responsible for validating JWT authentication.
 *
 * This guard extends NestJS Passport's JWT strategy guard and allows
 * routes or controllers marked with the `@Public()` decorator to bypass
 * authentication.
 *
 * If the route is not public, the request is validated using the `jwt`
 * authentication strategy.
 *
 * @implements {CanActivate}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Creates an instance of JwtAuthGuard.
   *
   * @param reflector - Utility service used to retrieve metadata
   * associated with routes and controllers.
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Determines whether the current request can proceed.
   *
   * The guard performs the following validations:
   * 1. Checks if the route or controller is marked as public.
   * 2. Grants access immediately when `@Public()` is present.
   * 3. Otherwise, delegates authentication validation to the JWT strategy.
   *
   * @param context - Current execution context.
   *
   * @returns `true` when the route is public or when the JWT validation succeeds.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
