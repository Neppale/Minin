import { clicksTable } from "./schema";
import { DrizzleDB } from "./client";
import type { CreateClickData } from "../../../core/entities/click.entity";
import type { ClickRepositoryPort } from "../../../core/ports/click-repository.port";

export class ClickRepository implements ClickRepositoryPort {
  constructor(private drizzle: DrizzleDB) {}

  async createMany(data: CreateClickData[]): Promise<void> {
    if (data.length === 0) {
      return;
    }

    await this.drizzle.insert(clicksTable).values(
      data.map((row) => ({
        url_id: row.urlId,
        clicked_at: row.clickedAt,
        ip_address: row.ip ?? null,
        country: row.country ?? null,
        user_agent: row.userAgent ?? null,
        browser: row.browser ?? null,
        os: row.os ?? null,
        device_type: row.deviceType ?? null,
      }))
    );
  }
}
