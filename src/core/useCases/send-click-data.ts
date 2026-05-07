import { UAParser } from "ua-parser-js";
import type { QueuePort } from "../ports/queue.port";

export type SendClickDataInput = {
  urlId: string;
  ip?: string;
  userAgent?: string;
  country?: string;
};

export class SendClickData {
  constructor(private queue: QueuePort) {}

  async send(input: SendClickDataInput): Promise<void> {
    try {
      const parser = new UAParser(input.userAgent ?? undefined);
      const result = parser.getResult();

      await this.queue.addJob("persist-click", {
        urlId: input.urlId,
        clickedAt: new Date().toISOString(),
        ip: input.ip ?? null,
        country: input.country ?? null,
        userAgent: input.userAgent ?? null,
        browser: result.browser.name ?? null,
        os: result.os.name ?? null,
        deviceType: result.device.type ?? null,
      });
    } catch (error) {
      console.error("Failed to send click data:", error);
    }
  }
}
