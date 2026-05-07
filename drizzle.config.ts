import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/drizzle/schema.ts",
  out: "./src/infra/database/drizzle/migrations",
  dialect: process.env.ENV === "LOCAL" ? "sqlite" : "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
