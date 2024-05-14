import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import * as controllers from './controllers';
import { jwtConstants } from './guard/constants';
import * as services from './services';

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
  controllers: Object.values(controllers),
  providers: Object.values(services),
})
export class AppModule {}
