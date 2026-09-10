import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(first_name: string, last_name: string): string {
    return `Hello ${first_name} ${last_name}`;
  }
}
