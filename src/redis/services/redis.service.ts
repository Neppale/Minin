import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { RedisClient } from './useCases/redis-client';
import { Cache } from 'cache-manager';
import { RedisClientSetParams } from '../models/redis-client-set.params';

@Injectable()
export class RedisService implements RedisClient {
  cacheManager: Cache;

  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.cacheManager = cacheManager;
  }

  async del(key: string): Promise<void> {
    if (key.includes('*')) {
      const keys: string[] = await this.cacheManager.store.keys(key);
      return keys.forEach(async (el) => await this.cacheManager.del(el));
    }

    await this.cacheManager.del(key);
  }

  async get(key: string): Promise<object> {
    return await this.cacheManager.get(key);
  }

  async set({ key, value }: RedisClientSetParams): Promise<void> {
    await this.cacheManager.set(key, value);
  }
}
