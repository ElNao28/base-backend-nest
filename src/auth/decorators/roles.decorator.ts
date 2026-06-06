import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum ROLES {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
