import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { AuthorizationRequiredGuard } from './utils/guards/authorization-required.guard';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorizationAwareCacheInterceptor } from './utils/interceptors/authorization-aware-cache.interceptor';
import { RedisModule } from './redis/redis.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [UrlModule, UserModule, RedisModule, HealthCheckModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationRequiredGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthorizationAwareCacheInterceptor,
    },
  ],
})
export class AppModule {}
