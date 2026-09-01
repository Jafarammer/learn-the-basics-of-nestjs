import { Controller, Post, Get } from '@nestjs/common';

@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'POST';
  }
  @Get('/sample')
  get(): string {
    return 'Hello Nestjs';
  }
}
