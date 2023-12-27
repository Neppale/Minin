/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { GetUrlStatisticsPrisma } from '../../../repository/get-url-statistics.prisma';
import { UrlStatistics } from '../../../models/url-statistics.model';

export class GetUrlStatisticsRepositoryMock implements GetUrlStatisticsPrisma {
  prisma: PrismaClient;
  count = 0;
  response = {
    totalClicks: 0,
    lastClickDate: new Date(),
    countryStatistics: [],
    cityStatistics: [],
    asnStatistics: [],
    browserStatistics: [],
    deviceStatistics: [],
    ispStatistics: [],
    platformStatistics: [],
    referrerStatistics: [],
    tagStatistics: [],
    timeStatistics: [],
    userAgentStatistics: [],
  };
  async get(_shortCode: string): Promise<UrlStatistics> {
    this.count++;
    return this.response;
  }
}
