import { RedisClient as BunRedisClient } from "bun";
import { CachePort } from "../../../core/ports/cache.port";

const client = new BunRedisClient(process.env.REDIS_URL!);

export const redisClient: CachePort = {
  get: async (key: string) => {
    return await client.get(key);
  },
  set: async (key: string, value: string, ttl: number) =>
    await client.set(key, value, "EX", ttl),
  del: async (key: string) => await client.del(key),
};

export type RedisDB = typeof redisClient;
