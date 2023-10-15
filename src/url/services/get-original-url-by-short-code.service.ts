import { Injectable } from '@nestjs/common';
import { GetOriginalUrlByShortCode } from './useCases/get-original-url-by-short-code';
import { GetOriginalUrlByShortCodeRepository } from '../repository/useCases/get-shortened-url.repository';
import { GetOriginalUrlByShortCodePrisma } from '../repository/get-original-url-by-short-code.prisma';

@Injectable()
export class GetOriginalUrlByShortCodeService
  implements GetOriginalUrlByShortCode
{
  getOriginalUrlByShortCodeRepository: GetOriginalUrlByShortCodeRepository;
  constructor(
    getOriginalUrlByShortCodeRepository: GetOriginalUrlByShortCodePrisma,
  ) {
    this.getOriginalUrlByShortCodeRepository =
      getOriginalUrlByShortCodeRepository;
  }

  async get(shortCode: string): Promise<string> {
    return await this.getOriginalUrlByShortCodeRepository.get(shortCode);
  }
}
