export const rabbitmqConfig = {
  hostname: process.env.RABBITMQ_HOST || "localhost",
  port: parseInt(process.env.RABBITMQ_PORT || "5672"),
  username: process.env.RABBITMQ_USERNAME || "guest",
  password: process.env.RABBITMQ_PASSWORD || "guest",
  vhost: process.env.RABBITMQ_VHOST || "/",
};

export const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME || "mininin-queue";
