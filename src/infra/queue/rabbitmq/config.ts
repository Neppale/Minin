import type { Options } from "amqplib";

function requireNonEmpty(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`${name} is not defined or empty`);
  }
  return value.trim();
}

export function getRabbitmqConnectionOptions(): Options.Connect {
  return {
    hostname: process.env.RABBITMQ_HOST || "localhost",
    port: parseInt(process.env.RABBITMQ_PORT || "5672", 10),
    username: requireNonEmpty(
      "RABBITMQ_USERNAME",
      process.env.RABBITMQ_USERNAME
    ),
    password: requireNonEmpty(
      "RABBITMQ_PASSWORD",
      process.env.RABBITMQ_PASSWORD
    ),
    vhost: process.env.RABBITMQ_VHOST || "/",
  };
}

export function getQueueName(): string {
  return process.env.RABBITMQ_QUEUE_NAME || "mininin-queue";
}
