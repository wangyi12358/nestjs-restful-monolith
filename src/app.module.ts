import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AppModule {}