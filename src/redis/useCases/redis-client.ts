import { RedisClientSetParams } from '../models/redis-client-set.params';

export interface RedisClient {
  set({ key, value }: RedisClientSetParams): Promise<void>;

  get(key: string): Promise<object>;

  del(key: string): Promise<void>;
}
