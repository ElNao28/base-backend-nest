import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles, ROLES } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';

export const Authorization = (...roles: ROLES[]) =>
  applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(AuthorizationGuard),
  );
