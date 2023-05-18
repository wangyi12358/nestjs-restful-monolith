import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Result } from '../common/result';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/api')
export class AuthController {
  @UseGuards(AuthGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return Result.ok(req.user);
  }

  @Post('/login')
  async login() {}

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout() {}
}
