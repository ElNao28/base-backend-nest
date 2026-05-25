import { Controller, Get } from '@nestjs/common';
import { Authorization } from './auth/decorators/authorization.decorator';
import { ROLES } from './auth/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Authorization(ROLES.SUPER_ADMIN)
  @Get()
  getHello(): string {
    return 'Hello world';
  }
}
