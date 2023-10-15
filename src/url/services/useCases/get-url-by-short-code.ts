import { Url } from '@prisma/client';

export interface GetUrlByShortCode {
  get(shortCode: string): Promise<Url>;
}
