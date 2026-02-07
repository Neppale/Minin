
import { urlsTable } from "./schema";
import { Url } from "../../../core/entities/url.entity";
import { DrizzleDB } from "./client";
import { and, eq, gt } from "drizzle-orm";
import { UrlRepositoryPort } from "../../../core/ports/url-repository.port";



export class UrlRepository implements UrlRepositoryPort {

  constructor(private drizzle: DrizzleDB) {
  }

  async create(data: { id: string; originalUrl: string; expirationDate?: Date }): Promise<Url> {
    const result = await this.drizzle.insert(urlsTable).values({
      id: data.id,
      original_url: data.originalUrl,
      expiration_date: data.expirationDate ? new Date(data.expirationDate) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();
    return {
      id: result[0].id,
      originalUrl: result[0].original_url,
      expirationDate: result[0].expiration_date || undefined,
      createdAt: result[0].created_at,
    };
  }

  async load(id: string): Promise<Url | null> {
    const result = await this.drizzle.select().from(urlsTable).where(and(eq(urlsTable.id, id), gt(urlsTable.expiration_date, new Date()))).limit(1);
    return result[0] ? {
      id: result[0].id,
      originalUrl: result[0].original_url,
      expirationDate: result[0].expiration_date || undefined,
      createdAt: result[0].created_at,
    } : null;
  }
}
