export interface QueuePort {
  addJob(name: string, data: Record<string, unknown>): Promise<void>;
}
