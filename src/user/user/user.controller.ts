import { Controller, Post, Get, Req, Query, Param } from '@nestjs/common';

@Controller('/api/users')
export class UserController {
  @Get('/hello')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `Hello ${firstName} ${lastName}`;
  }

  @Get('/:id')
  getByid(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }
  @Get('/sample')
  get(): string {
    return 'Hello Nestjs';
  }
}

/**
 * Http request list
 * 1. @Req() for express.request
 * 2. @Param(key?) for req.params.key
 * 3. $Body(key?) for req.body.key
 * 4. @Query(key?) for req.query.key
 * 5. @Header(key?) for req.headers.key
 * 6. @Ip() for req.ip
 * 7. @HostParam() for req.hosts
 *
 */
