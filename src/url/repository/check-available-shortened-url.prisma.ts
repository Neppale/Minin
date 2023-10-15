import { Injectable } from '@nestjs/common';
import { CheckAvailableShortenedUrlRepository } from './useCases/check-available-shortened-url.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class CheckAvailableShortenedUrlPrisma
  implements CheckAvailableShortenedUrlRepository
{
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async check(shortCode: string): Promise<boolean> {
    const existingUrl = await this.prisma.url.findUnique({
      where: {
        shortCode,
      },
    });
    if (existingUrl) return false;
    return true;
  }
}
