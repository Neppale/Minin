function requireNonEmpty(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} must be set and non-empty`);
  }
  return value;
}

function assertDatabaseAuthToken(): void {
  const env = process.env.ENV;
  if (env === "LOCAL") return;
  const token = process.env.DATABASE_AUTH_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "DATABASE_AUTH_TOKEN must be set and non-empty when ENV is not LOCAL"
    );
  }
}

export function assertApiEnv(): void {
  requireNonEmpty("REDIS_URL");
  requireNonEmpty("DATABASE_URL");
  assertDatabaseAuthToken();
  requireNonEmpty("RABBITMQ_USERNAME");
  requireNonEmpty("RABBITMQ_PASSWORD");
}

export function assertWorkerEnv(): void {
  requireNonEmpty("DATABASE_URL");
  assertDatabaseAuthToken();
  requireNonEmpty("RABBITMQ_USERNAME");
  requireNonEmpty("RABBITMQ_PASSWORD");
}
