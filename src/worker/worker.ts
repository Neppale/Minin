import { drizzleClient } from "../infra/database/drizzle/client";
import { createWorker } from "../infra/queue/rabbitmq/worker";
import { ClickRepository } from "../infra/database/drizzle/click.repository";

console.log("👷 Worker is starting...");

const clickRepo = new ClickRepository(drizzleClient);

createWorker(clickRepo).catch((error) => {
  console.error("Failed to start worker:", error);
  process.exit(1);
});
