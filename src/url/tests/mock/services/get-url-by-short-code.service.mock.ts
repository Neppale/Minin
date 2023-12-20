/* eslint-disable @typescript-eslint/no-unused-vars */
import { Url } from '@prisma/client';
import { GetUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';
import { GetUrlByShortCode } from '../../../services/useCases/get-url-by-short-code';

export class GetUrlByShortCodeServiceMock implements GetUrlByShortCode {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  count = 0;
  response = {
    id: 1,
    shortCode: 'abc123',
    originalUrl: 'https://www.google.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    clicks: 1,
    userId: 1,
    active: true,
  };

  async get(_shortCode: string): Promise<Url> {
    this.count++;
    return this.response;
  }
}
