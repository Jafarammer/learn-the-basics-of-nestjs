import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MysqlConnection,
  MongoDBConnection,
} from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import * as process from 'process';
import { createConnection } from './connection/connection';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    UserRepository,
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
