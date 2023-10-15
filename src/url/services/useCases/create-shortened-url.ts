import { Url } from '@prisma/client';

export interface CreateShortenedUrl {
  create: (url: string) => Promise<Url>;
}
