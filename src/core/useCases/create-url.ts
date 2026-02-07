import { CreateAttemptsExceededError } from "../../utils/handlers/error.handler";
import { Url } from "../entities/url.entity";
import { RedisDB } from "../../infra/cache/redis/client";
import { QueuePort } from "../ports/queue.port";
import { generateId } from "../../utils/generators/id.generator";

export class CreateUrl {
  cache: RedisDB
  queueAdapter: QueuePort
  constructor(cache: RedisDB, queueAdapter: QueuePort) {
    this.cache = cache;
    this.queueAdapter = queueAdapter;
  }

  async create(originalUrl: string, expirationDate?: Date) {
    const MAX_ATTEMPTS = 5;
    let createdUrl: Url | null = null;
    for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
      const id = generateId(originalUrl);
      try {
        await this.queueAdapter.addJob("persist-url", {
          id,
          originalUrl,
          expirationDate,
        });
        createdUrl = {
          id,
          originalUrl,
          expirationDate,
          createdAt: new Date(),
        };
        await this.cache.set(id, JSON.stringify(createdUrl));
        break;
      } catch (error: any) {
        switch (error.code) {
          case "SQLITE_CONSTRAINT_PRIMARYKEY":
            if (attempts === MAX_ATTEMPTS - 1) throw new CreateAttemptsExceededError();
            continue;
          default:
            throw error;
        }
      }
    }
    return createdUrl!;
  }
}