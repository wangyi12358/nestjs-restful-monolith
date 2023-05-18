import { PrismaClient } from '../../prisma/client';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  public client: PrismaClient;

  constructor(private configService: ConfigService) {
    this.client = new PrismaClient();
  }

  async onModuleInit() {
    const dbUrl = this.configService.get<string>('database.url');
    if (dbUrl) {
      this.client = new PrismaClient({
        datasources: {
          db: {
            url: dbUrl,
          },
        },
      });
    }
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
