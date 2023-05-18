import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserReq } from '../dto/user.dto';

@Controller('/api/user')
export class UserController {
  @Get()
  async list() {}

  @Post()
  async create(@Body() body: CreateUserReq) {

  }
}
