import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationAwareCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    if (request.method !== 'GET') return undefined;

    const bearerToken = request.rawHeaders.find((el: string) =>
      el.includes('Bearer'),
    );

    const tokenPart = bearerToken?.split('.')[2].slice(0, 10);
    const key = `${request.url}-${tokenPart}`;

    return key;
  }
}
