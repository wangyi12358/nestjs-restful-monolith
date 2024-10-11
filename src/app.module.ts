import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES_DAYS, JWT_SECRET } from './common/constants';
import * as controllers from './controllers';
import * as services from './services';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_EXPIRES_DAYS} days` },
    }),
  ],
  controllers: Object.values(controllers),
  providers: Object.values(services),
})
export class AppModule {}
