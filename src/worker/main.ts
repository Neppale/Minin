import "dotenv/config";
import { assertWorkerEnv } from "../env/assert-env";
import { createDrizzleClient } from "../infra/database/drizzle/client";
import { createWorker } from "../infra/queue/rabbitmq/worker";
import { ClickRepository } from "../infra/database/drizzle/click.repository";

assertWorkerEnv();

console.log("👷 Worker is starting...");

const drizzleClient = createDrizzleClient();
const clickRepo = new ClickRepository(drizzleClient);

createWorker(clickRepo).catch((error) => {
  console.error("Failed to start worker:", error);
  process.exit(1);
});
