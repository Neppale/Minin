import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { AuthorizationRequiredGuard } from './utils/guards/authorization-required.guard';
import { RedisModule } from './utils/redis/redis.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [UrlModule, UserModule, RedisModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationRequiredGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
