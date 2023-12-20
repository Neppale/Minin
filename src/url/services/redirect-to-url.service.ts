import { Injectable, NotFoundException } from '@nestjs/common';
import { RedirectToUrl } from './useCases/redirect-to-url';
import { RedirectToUrlDto } from '../models/dto/redirect-to-url.dto';
import { GetUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetUrlByShortCodePrisma } from '../repository/get-url-by-short-code.prisma';

@Injectable()
export class RedirectToUrlService implements RedirectToUrl {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;

  constructor(getUrlByShortCodeRepository: GetUrlByShortCodePrisma) {
    this.getUrlByShortCodeRepository = getUrlByShortCodeRepository;
  }
  async redirect({
    shortCode,
    request,
    response,
  }: RedirectToUrlDto): Promise<void> {
    const url = await this.getUrlByShortCodeRepository.get(shortCode);
    if (!url) {
      throw new NotFoundException({
        message: 'URL not found',
      });
    }

    response.redirect(url.originalUrl);
  }
}
