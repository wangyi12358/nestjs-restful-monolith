import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Result } from '~/common/result';
import { ResultCode } from '~/common/result-code';
import { CreateUserReq, UpdateUserReq, UserPageReq } from '~/dto/user.dto';
import { AuthGuard } from '~/guards/auth.guard';
import { ManagerGuard } from '~/guards/manager.guard';
import { UserService } from '~/services';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(ManagerGuard)
  @UseGuards(AuthGuard)
  @Get()
  async page(@Query() query: UserPageReq) {
    const data = await this.userService.page(query);
    return Result.ok(data);
  }

  @UseGuards(ManagerGuard)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateUserReq) {
    const isExist = await this.userService.findOneByUsername(body.username);
    if (isExist) {
      return Result.fail(ResultCode.USERNAME_EXISTS);
    }
    const user = await this.userService.create(body);
    return Result.ok(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() body: UpdateUserReq) {
    const user = await this.userService.update(req.user.id, body);
    return Result.ok({
      success: !!user,
    });
  }

  @Put('/disabled/:id')
  @UseGuards(ManagerGuard)
  @UseGuards(AuthGuard)
  async disabled(@Param('id') idStr: string) {
    const user = await this.userService.disabled(Number(idStr));
    return Result.ok({
      success: !!user,
    });
  }

  @UseGuards(ManagerGuard)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') idStr: string) {
    const id = Number(idStr);
    const data = await this.userService.delete(id);
    return Result.ok({
      success: !!data,
    });
  }
}
