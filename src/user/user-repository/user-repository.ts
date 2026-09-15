import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User } from '../../generated/prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('Create user repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}
