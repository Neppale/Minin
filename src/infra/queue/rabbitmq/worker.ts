import amqp from "amqplib";
import type { ClickRepositoryPort } from "../../../core/ports/click-repository.port";
import type { CreateClickData } from "../../../core/entities/click.entity";
import { getQueueName, getRabbitmqConnectionOptions } from "./config";

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
  const queueName = getQueueName();
  const connection = await amqp.connect(getRabbitmqConnectionOptions());

  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, {
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
    try {
      await clickRepo.createMany(rows);
      for (const b of batch) {
        channel.ack(b.msg);
      }
    } catch (error: unknown) {
      console.error("Failed to persist click batch:", error);
      for (const b of batch) {
        try {
          channel.nack(b.msg, false, true);
        } catch (nackErr: unknown) {
          console.error("nack failed:", nackErr);
        }
      }
    }
  };

  const scheduleFlush = (): void => {
    flushChain = flushChain
      .then(() => doFlush())
      .catch((error: unknown) => {
        console.error("Flush chain error:", error);
      });
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
    `👷 Worker connected to RabbitMQ. Waiting for messages in ${queueName}...`
  );

  const { consumerTag } = await channel.consume(
    queueName,
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
    await flushChain.catch((err: unknown) => {
      console.error("Flush chain on shutdown:", err);
    });
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
