import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles, ROLES } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';

/**
 * Combines the decorators required to protect an endpoint with
 * authentication and role-based authorization.
 *
 * This decorator applies the following decorators:
 * - `@ApiBearerAuth()` to indicate that the endpoint requires a Bearer token in Swagger.
 * - `@Roles(...roles)` to define the roles allowed to access the endpoint.
 * - `@UseGuards(AuthorizationGuard)` to enable authorization validation.
 *
 * @param roles - List of roles that are allowed to access the decorated route.
 *
 * @example
 * ```ts
 * @Authorization(ROLES.ADMIN, ROLES.SUPER_ADMIN)
 * @Get()
 * findAll() {
 *   return this.usersService.findAll();
 * }
 * ```
 */
export const Authorization = (...roles: ROLES[]) =>
  applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(AuthorizationGuard),
  );
