import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public-decorator.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello world';
  }
}
