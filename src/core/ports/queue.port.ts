export interface QueuePort {
  addJob(name: string, data: Record<string, any>): Promise<void>;
}