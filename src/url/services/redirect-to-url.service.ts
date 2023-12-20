import { Injectable, NotFoundException } from '@nestjs/common';
import { RedirectToUrl } from './useCases/redirect-to-url';
import { RedirectToUrlDto } from '../models/dto/redirect-to-url.dto';
import { GetUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetUrlByShortCodePrisma } from '../repository/get-url-by-short-code.prisma';
import { CreateClickDataFromRequestService } from './create-click-data-from-request.service';
import { CreateClickDataFromRequest } from './useCases/create-click-data-from-request';

@Injectable()
export class RedirectToUrlService implements RedirectToUrl {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  createClickDataFromRequestService: CreateClickDataFromRequest;

  constructor(
    getUrlByShortCodeRepository: GetUrlByShortCodePrisma,
    createClickDataFromRequestService: CreateClickDataFromRequestService,
  ) {
    this.getUrlByShortCodeRepository = getUrlByShortCodeRepository;
    this.createClickDataFromRequestService = createClickDataFromRequestService;
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

    await this.createClickDataFromRequestService.create(request);
    response.redirect(url.originalUrl);
  }
}
