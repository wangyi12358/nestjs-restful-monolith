import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from '~/common/result';
import { ResultCode } from '~/common/result-code';
import { LoginReq } from '~/dto';
import { AuthGuard } from '~/guards/auth.guard';
import { UserService } from '~/services';

@Controller('/api')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return Result.ok(req.user);
  }

  @Post('/login')
  async login(@Body() body: LoginReq) {
    const user = await this.userService.login(body.username, body.password);
    if (!user) {
      return Result.fail(ResultCode.NOT_AUTHORIZED);
    }
    const token = await this.jwtService.signAsync(user);
    return Result.ok({
      token,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout() {}
}
