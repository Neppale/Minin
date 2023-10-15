/* eslint-disable @typescript-eslint/no-unused-vars */
import { Url } from '@prisma/client';
import { CreateShortenedUrl } from '../../../services/useCases/create-shortened-url';

export class CreateShortenedUrlServiceMock implements CreateShortenedUrl {
  count = 0;
  response = {
    id: 1,
    originalUrl: 'https://www.google.com',
    shortCode: 'abc123',
    createdAt: new Date(),
    updatedAt: new Date(),
    clicks: 1,
  };

  async create(_url: string): Promise<Url> {
    this.count++;
    return this.response;
  }
}
