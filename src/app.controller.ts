import { Controller, Get } from '@nestjs/common';
import { Authorization } from './auth/decorators/authorization.decorator';
import { ROLES } from './auth/decorators/roles.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { BooleanResponseDto } from './common/dto/boolean-response.dto';

@Controller()
export class AppController {
  constructor() {}

  @Authorization(ROLES.SUPER_ADMIN)
  @ApiOkResponse({
    type: BooleanResponseDto,
  })
  @Get()
  getHello(): string {
    return 'Hello world';
  }
}
