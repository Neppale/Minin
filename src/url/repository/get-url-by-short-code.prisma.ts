import { Injectable } from '@nestjs/common';
import { GetUrlByShortCodeRepository } from './useCases/get-shortened-url.repository';
import { PrismaClient, Url } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class GetUrlByShortCodePrisma implements GetUrlByShortCodeRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async get(shortCode: string): Promise<Url> {
    const url = await this.prisma.url.findUnique({
      where: {
        shortCode,
      },
    });

    return url;
  }
}
