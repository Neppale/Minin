import amqp from "amqplib";
import type { ClickRepositoryPort } from "../../../core/ports/click-repository.port";
import type { CreateClickData } from "../../../core/entities/click.entity";
import { rabbitmqConfig, QUEUE_NAME } from "./config";

const BATCH_SIZE = 100;
const BATCH_TIMEOUT_MS = 2000;

type BufferedItem = {
  msg: amqp.ConsumeMessage;
  row: CreateClickData;
};

function parsePersistClick(msg: amqp.ConsumeMessage): CreateClickData | null {
  const content = JSON.parse(msg.content.toString()) as {
    name?: string;
    data?: Record<string, unknown>;
  };
  const { name, data } = content;

  if (name !== "persist-click") return null;
  if (
    !data ||
    typeof data.urlId !== "string" ||
    typeof data.clickedAt !== "string"
  )
    return null;

  return {
    urlId: data.urlId,
    clickedAt: new Date(data.clickedAt),
    ip: data.ip != null ? String(data.ip) : null,
    country: data.country != null ? String(data.country) : null,
    userAgent: data.userAgent != null ? String(data.userAgent) : null,
    browser: data.browser != null ? String(data.browser) : null,
    os: data.os != null ? String(data.os) : null,
    deviceType: data.deviceType != null ? String(data.deviceType) : null,
  };
}

export const createWorker = async (clickRepo: ClickRepositoryPort) => {
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

  channel.prefetch(BATCH_SIZE);

  const buffer: BufferedItem[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  let flushChain: Promise<void> = Promise.resolve();

  const doFlush = async (): Promise<void> => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (buffer.length === 0) return;

    const batch = buffer.splice(0, buffer.length);
    const rows = batch.map((b) => b.row);
    await clickRepo.createMany(rows);
  };

  const scheduleFlush = (): void => {
    flushChain = flushChain.then(() => doFlush());
  };

  const armTimer = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      scheduleFlush();
    }, BATCH_TIMEOUT_MS);
  };

  console.log(
    `👷 Worker connected to RabbitMQ. Waiting for messages in ${QUEUE_NAME}...`
  );

  const { consumerTag } = await channel.consume(
    QUEUE_NAME,
    (msg: amqp.ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const row = parsePersistClick(msg);
        if (row === null) return channel.ack(msg);

        buffer.push({ msg, row });

        if (buffer.length >= BATCH_SIZE) {
          if (timer !== undefined) {
            clearTimeout(timer);
            timer = undefined;
          }
          scheduleFlush();
        } else {
          armTimer();
        }
      } catch (error: unknown) {
        console.error(`Invalid message, discarding: ${error}`);
        channel.nack(msg, false, false);
      }
    }
  );

  const close = async () => {
    console.log("🛑 Worker shutting down...");
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (consumerTag) {
      await channel.cancel(consumerTag);
    }
    await flushChain;
    if (buffer.length > 0) {
      await doFlush();
    }
    await channel.close();
    await connection.close();
  };

  process.on("SIGTERM", close);
  process.on("SIGINT", close);

  return { close };
};
