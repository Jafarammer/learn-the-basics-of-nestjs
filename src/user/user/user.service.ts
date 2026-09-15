import { Injectable } from '@nestjs/common';
import { ValidationService } from '../../validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private validation: ValidationService) {}
  sayHello(name: string): string {
    const schema = z.string().min(3).max(100);
    const result = this.validation.validate(schema, name);
    return `Hello ${result}`;
  }
}
