import { Elysia, NotFoundError } from "elysia";
import { redirect } from "elysia";
import { UrlRepository } from "../infra/database/drizzle/url.repository";
import { CreateUrlDto } from "./dtos/create-url.dto";
import { LoadUrlDto } from "./dtos/load-url.dto";
import { CreateUrl } from "../core/useCases/create-url";
import { LoadUrl } from "../core/useCases/load-url";
import { drizzleClient } from "../infra/database/drizzle/client";
import { redisClient as cache } from "../infra/cache/redis/client";
import { Healthcheck } from "../core/useCases/healthcheck";
import { SendClickData } from "../core/useCases/send-click-data";
import { RabbitmqAdapter } from "../infra/queue/rabbitmq/rabbitmq.adapter";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { generateClickData } from "../utils/generators/click-data.generator";

const urlRepository = new UrlRepository(drizzleClient);
const createUrl = new CreateUrl(urlRepository, cache);
const loadUrl = new LoadUrl(urlRepository);
const healthcheck = Healthcheck.getInstance();
const queue = new RabbitmqAdapter();
const sendClickData = new SendClickData(queue);

const app = new Elysia()
  .use(cors())
  .group("/api", (app) =>
    app
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
        async ({ params, request }) => {
          const cachedOriginalUrl = await cache.get(params.id);
          if (cachedOriginalUrl) {
            sendClickData.send(generateClickData(params.id, request));
            return redirect(cachedOriginalUrl, 307);
          }
          const url = await loadUrl.load(params.id);
          if (url) {
            sendClickData.send(generateClickData(params.id, request));
            return redirect(url.originalUrl, 307);
          }
          throw new NotFoundError("The URL you are looking for does not exist");
        },
        {
          params: LoadUrlDto,
        }
      )
  )
  .use(
    staticPlugin({
      assets: "frontend",
      prefix: "/",
    })
  )
  .get("/", () => Bun.file("frontend/index.html"))
  .listen(3001);

console.log(`🚀 Minin.in is running on ${app.server?.url}`);

process.on("SIGTERM", async () => {
  console.log("🛑 API shutting down...");
  await queue.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("🛑 API shutting down...");
  await queue.close();
  process.exit(0);
});

export default app;
