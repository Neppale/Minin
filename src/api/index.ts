import { Elysia, t } from "elysia";
import { redirect } from "elysia";
import { UrlRepository } from "../infra/database/drizzle/url.repository";
import { CreateUrlDto } from "./dtos/create-url.dto";
import { LoadUrlDto } from "./dtos/load-url.dto";
import { CreateUrl } from "../core/useCases/create-url";
import { LoadUrl } from "../core/useCases/load-url";
import { drizzleClient } from "../infra/database/drizzle/client";
import { redisClient as cache } from "../infra/cache/redis/client";
import { RabbitmqAdapter } from "../infra/queue/rabbitmq/rabbitmq.adapter";
import { Healthcheck } from "../core/useCases/healthcheck";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

const queueAdapter = new RabbitmqAdapter();
const urlRepository = new UrlRepository(drizzleClient);
const createUrl = new CreateUrl(cache, queueAdapter);
const loadUrl = new LoadUrl(urlRepository, cache);
const healthcheck = Healthcheck.getInstance();

const app = new Elysia()
  .use(cors())
  .group("/api", app => app
    .get("/version", () => {
      return healthcheck.getVersion();
    })
    .post(
      "/",
      async ({ body }) => {
        return await createUrl.create(body.originalUrl, body.expirationDate);
      },
      {
        body: CreateUrlDto,
      }
    )
    .get(
      "/:id",
      async ({ params }) => {
        if (!/^[a-zA-Z0-9]{5,10}$/.test(params.id)) return;
        const url = await loadUrl.load(params.id);
        return redirect(url.originalUrl, 307);
      },
      {
        params: LoadUrlDto,
      }
    )
  )
  .use(staticPlugin({
    assets: 'frontend',
    prefix: '/'
  }))
  .get('/', () => Bun.file('frontend/index.html'))
  .listen(3001);

  console.log(`🚀 Minin.in is running on ${app.server?.url}`);

process.on("SIGTERM", async () => {
  console.log("🛑 API shutting down...");
  await queueAdapter.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("🛑 API shutting down...");
  await queueAdapter.close();
  process.exit(0);
});

export default app;
