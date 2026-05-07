import { RedisClient as BunRedisClient } from "bun";
import { CachePort } from "../../../core/ports/cache.port";

export function createRedisCache(redisUrl: string): CachePort {
  const client = new BunRedisClient(redisUrl);

  return {
    get: async (key: string) => {
      return await client.get(key);
    },
    set: async (key: string, value: string, ttl: number) =>
      await client.set(key, value, "EX", ttl),
    del: async (key: string) => await client.del(key),
  };
}
