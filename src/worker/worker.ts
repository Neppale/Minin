import { drizzleClient } from "../infra/database/drizzle/client";
import { createWorker } from "../infra/queue/rabbitmq/worker";
import { UrlRepository } from "../infra/database/drizzle/url.repository";
import { redisClient as cache } from "../infra/cache/redis/client";

console.log("👷 Worker is starting...");

const urlRepo = new UrlRepository(drizzleClient);

createWorker(urlRepo, cache).catch((error) => {
  console.error("Failed to start worker:", error);
  process.exit(1);
});
