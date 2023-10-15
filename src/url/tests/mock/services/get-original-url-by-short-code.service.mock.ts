/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetOriginalUrlByShortCode } from '../../../services/useCases/get-original-url-by-short-code';

export class GetOriginalUrlByShortCodeServiceMock
  implements GetOriginalUrlByShortCode
{
  count = 0;
  response = 'https://www.google.com';

  async get(_shortCode: string): Promise<string> {
    this.count++;
    return this.response;
  }
}
