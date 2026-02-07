import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error("TURSO_DATABASE_URL is not defined");
if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not defined");

const client = createClient({
    url,
    authToken,
});

export const drizzleClient = drizzle(client, { schema });

export type DrizzleDB = typeof drizzleClient;