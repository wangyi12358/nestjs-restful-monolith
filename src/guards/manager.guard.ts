import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JWT_SECRET } from '../common/constants';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  handleError() {
    throw new UnauthorizedException();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: User = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      if (payload.role !== 2) {
        // 非管理员账户，无权限
        this.handleError();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
