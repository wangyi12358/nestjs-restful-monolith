import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Result } from '../common/result';
import { ResultCode } from '../common/resultCode';
import { AuthGuard } from '../guard/auth.guard';
import { LoginReq } from '../dto/auth.dto';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';

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
