import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AppModule {}
