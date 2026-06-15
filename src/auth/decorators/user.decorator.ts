import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom parameter decorator that extracts the authenticated user
 * from the current HTTP request.
 *
 * If a property name is provided, only the specified field from
 * the user object is returned. Otherwise, the entire user object
 * is returned.
 *
 * This decorator depends on a previous authentication guard or
 * middleware that attaches the user information to `request.user`.
 *
 * @param data - Optional user property to retrieve.
 * @param ctx - Current execution context.
 *
 * @returns The complete authenticated user object or a specific property.
 *
 * @example
 * ```ts
 * @Get('profile')
 * getProfile(@User() user: JwtPayload) {
 *   return user;
 * }
 * ```
 *
 * @example
 * ```ts
 * @Get('profile')
 * getEmail(@User('email') email: string) {
 *   return email;
 * }
 * ```
 *
 * @example
 * ```ts
 * @Get('profile')
 * getUserId(@User('sub') id: number) {
 *   return id;
 * }
 * ```
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
