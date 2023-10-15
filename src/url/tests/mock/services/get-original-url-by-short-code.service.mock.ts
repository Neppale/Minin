/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetOriginalUrlByShortCodeRepository } from '../../../repository/useCases/get-shortened-url.repository';
import { GetOriginalUrlByShortCode } from '../../../services/useCases/get-original-url-by-short-code';

export class GetOriginalUrlByShortCodeServiceMock
  implements GetOriginalUrlByShortCode
{
  getOriginalUrlByShortCodeRepository: GetOriginalUrlByShortCodeRepository;
  count = 0;
  response = 'https://www.google.com';

  async get(_shortCode: string): Promise<string> {
    this.count++;
    return this.response;
  }
}
