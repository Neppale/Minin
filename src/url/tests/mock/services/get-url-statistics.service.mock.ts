/* eslint-disable @typescript-eslint/no-unused-vars */
import { Url } from '@prisma/client';
import { GetUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';
import { GetUrlStatisticsService } from '../../../services/get-url-statistics.service';

export class GetUrlStatisticsServiceMock implements GetUrlStatisticsService {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  count = 0;
  response = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    originalUrl: 'any_url',
    shortCode: 'any_short_code',
    clicks: 1,
    userId: 1,
  };

  async get(_shortCode: string, _authorization: string): Promise<Url> {
    this.count++;
    return this.response;
  }
}
