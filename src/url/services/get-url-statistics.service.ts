import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetUrlStatistics } from './useCases/get-url-statistics';
import { Url } from '@prisma/client';
import { GetUrlByShortCodePrisma } from '../repository/get-url-by-short-code.prisma';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUrlStatisticsService implements GetUrlStatistics {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;

  constructor(getUrlByShortCodeRepository: GetUrlByShortCodePrisma) {
    this.getUrlByShortCodeRepository = getUrlByShortCodeRepository;
  }
  async get(shortCode: string, authorization: string): Promise<Url> {
    const url = await this.getUrlByShortCodeRepository.get(shortCode);
    if (!url)
      throw new NotFoundException({ message: 'This URL does not exist.' });

    const userToken = jwt.decode(authorization) as {
      id: number;
      exp: number;
      iat: number;
    };

    if (userToken.id !== url.userId) {
      throw new UnauthorizedException({
        message: 'You are not allowed to see the statistics of this URL.',
      });
    }

    return url;
  }
}
