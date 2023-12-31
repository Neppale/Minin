import { Url } from '@prisma/client';

export interface GetUrlByShortCodeRepository {
  get(shortCode: string): Promise<Url>;
}
