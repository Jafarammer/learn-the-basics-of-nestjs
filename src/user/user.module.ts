import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MysqlConnection,
  MongoDBConnection,
} from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import {
  UserRepository,
  createUserRepository,
} from './user-repository/user-repository';
import * as process from 'process';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE === 'mysql' ? MysqlConnection : MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
  ],
})
export class UserModule {}
