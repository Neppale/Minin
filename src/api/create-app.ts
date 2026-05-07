import { Elysia, NotFoundError } from "elysia";
import { redirect } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { CreateUrlDto } from "./dtos/create-url.dto";
import { LoadUrlDto } from "./dtos/load-url.dto";
import { Healthcheck } from "../core/useCases/healthcheck";
import { generateClickData } from "../utils/generators/click-data.generator";
import type { CachePort } from "../core/ports/cache.port";
import type { CreateUrl } from "../core/useCases/create-url";
import type { LoadUrl } from "../core/useCases/load-url";
import type { SendClickData } from "../core/useCases/send-click-data";

export type ApiComposition = {
  cache: CachePort;
  createUrl: CreateUrl;
  loadUrl: LoadUrl;
  healthcheck: Healthcheck;
  sendClickData: SendClickData;
};

export function createApp(composition: ApiComposition) {
  const { cache, createUrl, loadUrl, healthcheck, sendClickData } = composition;

  return new Elysia()
    .use(cors())
    .group("/api", (app) =>
      app
        .get("/version", () => {
          return healthcheck.getVersion();
        })
        .post(
          "/",
          async ({ body }) => {
            return await createUrl.create(
              body.originalUrl,
              body.expirationDate
            );
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
            throw new NotFoundError(
              "The URL you are looking for does not exist"
            );
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
    .get("/", () => Bun.file("frontend/index.html"));
}
