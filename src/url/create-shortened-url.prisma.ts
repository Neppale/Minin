import { Injectable } from '@nestjs/common';
import { CreateShortenedUrlRepository } from './repository/useCases/create-shortened-url.repository';
import { PrismaClient, Url } from '@prisma/client';
import { PrismaService } from '../prisma/services/prisma.service';
import { CreateShortenedUrlParams } from './models/params/create-shortened-url.params';

@Injectable()
export class CreateShortenedUrlPrisma implements CreateShortenedUrlRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async create({
    shortCode,
    originalUrl,
  }: CreateShortenedUrlParams): Promise<Url> {
    const createdUrl = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    return createdUrl;
  }
}
