require("dotenv").config();

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/database/drizzle/schema.ts",
  out: "./src/infra/database/drizzle/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;