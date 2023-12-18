/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Url } from '@prisma/client';
import { CreateShortenedUrlRepository } from '../../../repository/useCases/create-shortened-url.repository';
import { CreateShortenedUrlParams } from '../../../models/params/create-shortened-url.params';

export class CreateShortenedUrlRepositoryMock
  implements CreateShortenedUrlRepository
{
  prisma: PrismaClient;
  count = 0;
  response = {
    id: 1,
    originalUrl: 'https://www.google.com',
    shortCode: 'abc123',
    createdAt: new Date(),
    updatedAt: new Date(),
    clicks: 1,
    userId: 1,
  };

  async create(_params: CreateShortenedUrlParams): Promise<Url> {
    this.count++;
    return this.response;
  }
}
