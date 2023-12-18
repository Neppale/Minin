import { Url } from '@prisma/client';

export interface GetUrlStatistics {
  get(shortCode: string, authorization: string): Promise<Url>;
}
