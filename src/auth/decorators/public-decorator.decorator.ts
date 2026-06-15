import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key used to identify routes that can be accessed
 * without authentication.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route or controller as public.
 *
 * Endpoints decorated with `@Public()` bypass authentication
 * and authorization checks performed by guards that validate
 * the `IS_PUBLIC_KEY` metadata.
 *
 * @returns A decorator that sets the `IS_PUBLIC_KEY` metadata to `true`.
 *
 * @example
 * ```ts
 * @Public()
 * @Post('login')
 * login(@Body() loginDto: LoginDto) {
 *   return this.authService.login(loginDto);
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
