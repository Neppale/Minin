import amqp from "amqplib";
import { getQueueName, getRabbitmqConnectionOptions } from "./config";

export async function probeRabbitMq(): Promise<void> {
  const connection = await amqp.connect(getRabbitmqConnectionOptions());
  try {
    const channel = await connection.createChannel();
    try {
      await channel.assertQueue(getQueueName(), {
        durable: true,
      });
    } finally {
      await channel.close();
    }
  } finally {
    await connection.close();
  }
}
