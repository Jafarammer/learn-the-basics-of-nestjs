import {
  Controller,
  Post,
  Get,
  Req,
  Query,
  Param,
  Res,
  Header,
  HttpCode,
  Redirect,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Response, Request } from 'express';

@Controller('/api/users')
export class UserController {
  @Get('/view/test')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template engine',
      name: name,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Succes set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/hello')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello ${firstName} ${lastName}`;
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      message: 'Hello Jafar',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Post()
  post(): string {
    return 'POST';
  }
  @Get('/sample')
  get(): string {
    return 'Hello Nestjs';
  }

  // @Get('/:id')
  // getByid(@Param('id') id: string): string {
  //   return `GET ${id}`;
  // }
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

/**
 * Http response list
 * 1. @HttpCode(code) to change response status code
 * 2. @Header(key,value) to change response header
 * 3. @Redirect(locatioin,code) to change redirect with return type using HttpRedirectResponse
 * 4. @Next() for next express function
 */
