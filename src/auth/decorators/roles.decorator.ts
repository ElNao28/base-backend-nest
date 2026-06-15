import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key used to store the roles required to access
 * a route or controller.
 */
export const ROLES_KEY = 'roles';

/**
 * Defines the roles available within the application.
 */
export enum ROLES {
  /**
   * Full access to all application resources and features.
   */
  SUPER_ADMIN = 1,

  /**
   * Administrative access with elevated permissions.
   */
  ADMIN = 2,

  /**
   * Standard user with limited permissions.
   */
  USER = 3,
}

/**
 * Assigns the roles required to access a route or controller.
 *
 * This decorator stores the allowed roles in the route metadata,
 * which can later be evaluated by an authorization guard.
 *
 * @param roles - List of roles that are allowed to access the decorated resource.
 * @returns A decorator that sets the required roles metadata.
 *
 * @example
 * ```ts
 * @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN)
 * @Get()
 * findAll() {
 *   return this.usersService.findAll();
 * }
 * ```
 *
 * @example
 * ```ts
 * @Roles(ROLES.USER)
 * @Get('profile')
 * getProfile() {
 *   return this.authService.getProfile();
 * }
 * ```
 */
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
