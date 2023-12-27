/* eslint-disable @typescript-eslint/no-unused-vars */
import { RedirectToUrlDto } from '../../../models/dto/redirect-to-url.dto';
import { GetUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';
import { RedirectToUrlService } from '../../../services/redirect-to-url.service';
import { CreateClickDataFromRequest } from '../../../services/useCases/create-click-data-from-request';

export class RedirectToUrlServiceMock implements RedirectToUrlService {
  getUrlByShortCodeRepository: GetUrlByShortCodeRepository;
  createClickDataFromRequestService: CreateClickDataFromRequest;
  count = 0;
  async redirect({
    shortCode: _shortCode,
    request: _request,
    response: _response,
  }: RedirectToUrlDto): Promise<void> {
    this.count++;
    return;
  }
}
