import { Url } from "../entities/url.entity";

export type CreateUrlData = {
  id: string;
  originalUrl: string;
  expirationDate?: Date;
};

export interface UrlRepositoryPort {
  create(data: CreateUrlData): Promise<Url>;
  load(id: string): Promise<Url | null>;
}