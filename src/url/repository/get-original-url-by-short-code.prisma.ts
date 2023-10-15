import { Injectable } from '@nestjs/common';
import { GetOriginalUrlByShortCodeRepository } from './useCases/get-shortened-url.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class GetOriginalUrlByShortCodePrisma
  implements GetOriginalUrlByShortCodeRepository
{
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async get(shortCode: string): Promise<string> {
    const url = await this.prisma.url.findUnique({
      where: {
        shortCode,
      },
    });

    return url?.originalUrl;
  }
}
