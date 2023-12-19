import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './services/redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ttl: Number(process.env.REDIS_TTL),
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB),
      tls: process.env.ENV !== 'LOCAL',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
