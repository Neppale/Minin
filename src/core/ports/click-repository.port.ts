import type { CreateClickData } from "../entities/click.entity";

export interface ClickRepositoryPort {
  createMany(data: CreateClickData[]): Promise<void>;
}
