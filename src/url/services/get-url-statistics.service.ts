import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetUrlStatistics } from './useCases/get-url-statistics';
import { GetUrlByShortCodePrisma } from '../repository/get-url-by-short-code.prisma';
import * as jwt from 'jsonwebtoken';
import { UrlStatistics } from '../models/url-statistics.model';
import { GetUrlStatisticsRepository } from '../repository/useCases/get-url-statistics.repository';
import { GetUrlStatisticsPrisma } from '../repository/get-url-statistics.prisma';

@Injectable()
export class GetUrlStatisticsService implements GetUrlStatistics {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  getUrlStatisticsRepository: GetUrlStatisticsRepository;

  constructor(
    getUrlByShortCodeRepository: GetUrlByShortCodePrisma,
    getUrlStatisticsRepository: GetUrlStatisticsPrisma,
  ) {
    this.getUrlByShortCodeRepository = getUrlByShortCodeRepository;
    this.getUrlStatisticsRepository = getUrlStatisticsRepository;
  }
  async get(shortCode: string, authorization: string): Promise<UrlStatistics> {
    const url = await this.getUrlByShortCodeRepository.get(shortCode);
    if (!url)
      throw new NotFoundException({ message: 'This URL does not exist.' });

    const token = authorization.split(' ')[1];
    const userToken = jwt.decode(token) as {
      id: number;
      exp: number;
      iat: number;
    };

    if (userToken.id != url.userId) {
      throw new UnauthorizedException({
        message: 'You are not allowed to see the statistics of this URL.',
      });
    }

    const urlStatistics = await this.getUrlStatisticsRepository.get(shortCode);

    return urlStatistics;
  }
}
