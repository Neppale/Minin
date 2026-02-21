import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const urlsTable = sqliteTable("urls", {
  id: text().primaryKey(),
  original_url: text().notNull(),
  expiration_date: integer({ mode: "timestamp" }),
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
