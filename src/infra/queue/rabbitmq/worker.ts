import amqp from "amqplib";
import { UrlRepository } from "../../database/drizzle/url.repository";
import { CachePort } from "../../../core/ports/cache.port";
import { rabbitmqConfig, QUEUE_NAME } from "./config";

export const createWorker = async (repo: UrlRepository, cache: CachePort) => {
  const connection = await amqp.connect({
    hostname: rabbitmqConfig.hostname,
    port: rabbitmqConfig.port,
    username: rabbitmqConfig.username,
    password: rabbitmqConfig.password,
    vhost: rabbitmqConfig.vhost,
  });

  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  channel.prefetch(10);

  console.log(`👷 Worker connected to RabbitMQ. Waiting for messages in ${QUEUE_NAME}...`);

  channel.consume(QUEUE_NAME, async (msg: any) => {
    if (!msg) {
      return;
    }

    try {
      const content = JSON.parse(msg.content.toString());
      const { name, data } = content;

      if (name === "persist-url") {
        console.log(`Processing Job: Saving URL ${data.id}`);
        
        await repo.create({
          id: data.id,
          originalUrl: data.originalUrl,
          expirationDate: data.expirationDate,
        });
        
        await cache.del(data.id);
        console.log(`Saved!`);
      }

      channel.ack(msg);
    } catch (error: any) {
      console.error(`Job failed: ${error}`);
      channel.nack(msg, false, true);
    }
  });

  const close = async () => {
    console.log("🛑 Worker shutting down...");
    await channel.close();
    await connection.close();
  };

  process.on("SIGTERM", close);
  process.on("SIGINT", close);

  return { close };
};
