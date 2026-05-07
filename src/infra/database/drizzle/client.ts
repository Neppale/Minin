import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export function createDrizzleClient() {
  const url = process.env.DATABASE_URL!.trim();
  const authToken = process.env.DATABASE_AUTH_TOKEN?.trim();

  const client = createClient({
    url,
    authToken,
  });

  return drizzle(client, { schema });
}

export type DrizzleDB = ReturnType<typeof createDrizzleClient>;
