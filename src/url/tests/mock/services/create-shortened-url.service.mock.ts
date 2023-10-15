/* eslint-disable @typescript-eslint/no-unused-vars */
import { Url } from '@prisma/client';
import { CreateShortenedUrl } from '../../../services/useCases/create-shortened-url';
import { CheckAvailableShortenedUrlRepository } from '../../../repository/useCases/check-available-shortened-url.repository';
import { CreateShortenedUrlRepository } from '../../../repository/useCases/create-shortened-url.repository';

export class CreateShortenedUrlServiceMock implements CreateShortenedUrl {
  checkAvailableShortenedUrlRepository: CheckAvailableShortenedUrlRepository;
  createShortenedUrlRepository: CreateShortenedUrlRepository;

  createCount = 0;
  generateCount = 0;
  response = {
    id: 1,
    originalUrl: 'https://www.google.com',
    shortCode: 'abc123',
    createdAt: new Date(),
    updatedAt: new Date(),
    clicks: 1,
  };

  async create(_url: string): Promise<Url> {
    this.createCount++;
    return this.response;
  }

  generateRandomShortCode(): string {
    this.generateCount++;
    return this.response.shortCode;
  }
}
