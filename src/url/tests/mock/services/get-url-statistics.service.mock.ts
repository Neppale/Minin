/* eslint-disable @typescript-eslint/no-unused-vars */
import { Url } from '@prisma/client';
import { GetUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';
import { GetUrlStatisticsService } from '../../../services/get-url-statistics.service';
import { UrlStatistics } from '../../../models/url-statistics.model';
import { GetUrlStatisticsRepository } from '../../../repository/useCases/get-url-statistics.repository';

export class GetUrlStatisticsServiceMock implements GetUrlStatisticsService {
  getUrlStatisticsRepository: GetUrlStatisticsRepository;
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  count = 0;
  response: UrlStatistics = {
    asnStatistics: [],
    cityStatistics: [],
    countryStatistics: [],
    browserStatistics: [],
    deviceStatistics: [],
    ispStatistics: [],
    lastClickDate: new Date(),
    platformStatistics: [],
    referrerStatistics: [],
    tagStatistics: [],
    timeStatistics: [],
    userAgentStatistics: [],
    totalClicks: 0,
  };

  async get(
    _shortCode: string,
    _authorization: string,
  ): Promise<UrlStatistics> {
    this.count++;
    return this.response;
  }
}
