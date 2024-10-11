import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import crypto from 'node:crypto';
import { CreateUserReq, UpdateUserReq, UserPageReq } from '~/dto/user.dto';
import { generateSalt, hashPassword } from '~/utils/sha3/sha3';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findOneByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async page(query: UserPageReq) {
    const where: Partial<User> = {};
    if (query.username) where.username = query.username;
    const list = await this.prismaService.user.findMany({
      where,
      skip: query.pageSize,
      take: query.take,
    });
    const total = await this.prismaService.user.count({ where });
    return {
      list,
      total,
    };
  }

  create(req: CreateUserReq) {
    const salt = generateSalt();
    return this.prismaService.user.create({
      data: {
        username: req.username,
        salt,
        password: hashPassword(req.password, salt),
        gender: req.gender,
        age: req.age,
        role: req.role,
      },
    });
  }

  disabled(id: number) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        status: 0,
      },
    });
  }

  update(id: number, req: UpdateUserReq) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: req,
    });
  }

  delete(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
    if (user && user.password === hashPassword(password, user.salt)) {
      return user;
    }
  }

  passwordMd5(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
