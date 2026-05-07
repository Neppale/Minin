import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;
const env = process.env.ENV;

if (!url) throw new Error("DATABASE_URL is not defined");
if (!authToken && env !== "LOCAL")
  throw new Error("DATABASE_AUTH_TOKEN is not defined");

const client = createClient({
  url,
  authToken,
});

export const drizzleClient = drizzle(client, { schema });

export type DrizzleDB = typeof drizzleClient;
