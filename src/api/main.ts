import "dotenv/config";
import { bootstrapApi } from "../bootstrap/api";

console.log(`🚀 Minin.in API is starting...`);
const { app, queue } = await bootstrapApi().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});

app.listen(3001);

console.log(`🚀 Minin.in is running on ${app.server?.url}`);

async function shutdown(): Promise<void> {
  console.log("🛑 API shutting down...");
  await queue.close();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
