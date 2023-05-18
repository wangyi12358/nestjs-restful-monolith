import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  create() {

  }

  login(username: string, password: string) {
    return this.prismaService.client.user.findFirst({
      where: {
        username,
        password: this.passwordMd5(password),
      },
    });
  }

  passwordMd5(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
