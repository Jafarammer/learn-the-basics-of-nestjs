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
  Inject,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { MemberService } from '../member/member.service';
import { UserRepository } from '../user-repository/user-repository';
import { User } from '../../generated/prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService,
  ) {}

  @Get('/create')
  async create(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    return this.userRepository.save(firstName, lastName);
  }

  @Get('/connection')
  async getConnectedDB(): Promise<string | null> {
    this.mailService.send();
    this.emailService.send();
    console.info(this.memberService.getConnectionName());
    this.memberService.sendMail();

    return this.connection.getName();
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

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
