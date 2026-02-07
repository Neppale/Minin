import amqp from "amqplib";
import { QueuePort } from "../../../core/ports/queue.port";
import { rabbitmqConfig, QUEUE_NAME } from "./config";

export class RabbitmqAdapter implements QueuePort {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;
  private queueName: string;

  constructor(queueName: string = QUEUE_NAME) {
    this.queueName = queueName;
  }

  private async ensureConnection(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect({
        hostname: rabbitmqConfig.hostname,
        port: rabbitmqConfig.port,
        username: rabbitmqConfig.username,
        password: rabbitmqConfig.password,
        vhost: rabbitmqConfig.vhost,
      });
    }

    if (!this.channel) {
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, {
        durable: true,
      });
    }
  }

  async addJob(name: string, data: Record<string, any>): Promise<void> {
    await this.ensureConnection();
    
    if (!this.channel) {
      throw new Error("Channel not initialized");
    }

    const message = JSON.stringify({
      name,
      data,
      timestamp: new Date().toISOString(),
    });

    this.channel.sendToQueue(this.queueName, Buffer.from(message), {
      persistent: true,
    });
    console.log(`🚀 Job ${name} added to queue ${this.queueName}`);
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
