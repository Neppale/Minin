import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUrlByShortCode } from './useCases/get-url-by-short-code';
import { GetUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetUrlByShortCodePrisma } from '../repository/get-url-by-short-code.prisma';
import { Url } from '@prisma/client';

@Injectable()
export class GetUrlByShortCodeService implements GetUrlByShortCode {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  constructor(getUrlByShortCodeRepository: GetUrlByShortCodePrisma) {
    this.getUrlByShortCodeRepository = getUrlByShortCodeRepository;
  }

  async get(shortCode: string): Promise<Url> {
    const url = await this.getUrlByShortCodeRepository.get(shortCode);
    if (!url) throw new NotFoundException('This URL does not exist.');

    return url;
  }
}
