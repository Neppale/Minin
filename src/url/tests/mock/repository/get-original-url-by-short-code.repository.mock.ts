/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { GetOriginalUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';

export class GetOriginalUrlByShortCodeRepositoryMock
  implements GetOriginalUrlByShortCodeRepository
{
  prisma: PrismaClient;
  count = 0;
  response = 'https://www.google.com';

  async get(_shortCode: string): Promise<string> {
    this.count++;
    return this.response;
  }
}
