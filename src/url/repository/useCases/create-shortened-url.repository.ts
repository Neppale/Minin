import { Url } from '@prisma/client';
import { CreateShortenedUrlParams } from '../../models/params/create-shortened-url.params';

export interface CreateShortenedUrlRepository {
  create(params: CreateShortenedUrlParams): Promise<Url>;
}
