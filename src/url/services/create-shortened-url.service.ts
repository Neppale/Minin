import { Injectable } from '@nestjs/common';
import { CreateShortenedUrl } from './useCases/create-shortened-url';
import { CheckAvailableShortenedUrlRepository } from '../repository/useCases/check-available-shortened-url.repository';
import { CheckAvailableShortenedUrlPrisma } from '../repository/check-available-shortened-url.prisma';
import { CreateShortenedUrlPrisma } from '../repository/create-shortened-url.prisma';
import { CreateShortenedUrlRepository } from '../repository/useCases/create-shortened-url.repository';
import { Url } from '@prisma/client';

@Injectable()
export class CreateShortenedUrlService implements CreateShortenedUrl {
  checkAvailableShortenedUrlRepository: CheckAvailableShortenedUrlRepository;
  createShortenedUrlRepository: CreateShortenedUrlRepository;

  constructor(
    checkAvailableShortenedUrlRepository: CheckAvailableShortenedUrlPrisma,
    createShortenedUrlRepository: CreateShortenedUrlPrisma,
  ) {
    this.checkAvailableShortenedUrlRepository =
      checkAvailableShortenedUrlRepository;
    this.createShortenedUrlRepository = createShortenedUrlRepository;
  }

  async create(url: string): Promise<Url> {
    let isAvailable = false;
    let shortCode = '';

    while (!isAvailable) {
      shortCode = this.generateRandomShortCode();
      isAvailable = await this.checkAvailableShortenedUrlRepository.check(
        shortCode,
      );
    }

    const createdUrl = await this.createShortenedUrlRepository.create({
      originalUrl: url,
      shortCode,
    });

    return createdUrl;
  }

  private generateRandomShortCode(): string {
    const length = 6;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }
}
