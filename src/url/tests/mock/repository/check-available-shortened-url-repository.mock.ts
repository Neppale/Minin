/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { CheckAvailableShortenedUrlRepository } from '../../../repository/useCases/check-available-shortened-url.repository';

export class CheckAvailableShortenedUrlRepositoryMock
  implements CheckAvailableShortenedUrlRepository
{
  prisma: PrismaClient;
  count = 0;
  response = true;
  async check(_shortCode: string): Promise<boolean> {
    this.count++;
    return this.response;
  }
}
