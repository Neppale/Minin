import { sql } from "drizzle-orm";
import { assertApiEnv } from "../utils/env/assert-env";
import { createRedisCache } from "../infra/cache/redis/client";
import { createDrizzleClient } from "../infra/database/drizzle/client";
import { UrlRepository } from "../infra/database/drizzle/url.repository";
import { probeRabbitMq } from "../infra/queue/rabbitmq/probe";
import { RabbitmqAdapter } from "../infra/queue/rabbitmq/rabbitmq.adapter";
import { CreateUrl } from "../core/useCases/create-url";
import { LoadUrl } from "../core/useCases/load-url";
import { Healthcheck } from "../core/useCases/healthcheck";
import { SendClickData } from "../core/useCases/send-click-data";
import { createApp } from "../api/create-app";

const REDIS_PROBE_KEY = "__minin_probe__";

async function probeDatabase(
  db: ReturnType<typeof createDrizzleClient>
): Promise<void> {
  await db.run(sql`SELECT 1`);
}

async function probeRedis(
  cache: ReturnType<typeof createRedisCache>
): Promise<void> {
  await cache.set(REDIS_PROBE_KEY, "ok", 60);
  const value = await cache.get(REDIS_PROBE_KEY);
  if (value !== "ok") {
    throw new Error("Redis probe failed: unexpected value after set");
  }
  await cache.del(REDIS_PROBE_KEY);
}

export type BootstrapApiResult = {
  app: ReturnType<typeof createApp>;
  queue: RabbitmqAdapter;
};

export async function bootstrapApi(): Promise<BootstrapApiResult> {
  assertApiEnv();

  const drizzleClient = createDrizzleClient();
  await probeDatabase(drizzleClient);

  const redisUrl = process.env.REDIS_URL!.trim();
  const cache = createRedisCache(redisUrl);
  await probeRedis(cache);

  await probeRabbitMq();

  const urlRepository = new UrlRepository(drizzleClient);
  const createUrl = new CreateUrl(urlRepository, cache);
  const loadUrl = new LoadUrl(urlRepository);
  const healthcheck = Healthcheck.getInstance();
  const queue = new RabbitmqAdapter();
  const sendClickData = new SendClickData(queue);

  const app = createApp({
    cache,
    createUrl,
    loadUrl,
    healthcheck,
    sendClickData,
  });

  return { app, queue };
}
