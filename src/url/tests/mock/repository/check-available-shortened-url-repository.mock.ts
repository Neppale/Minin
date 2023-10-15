/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckAvailableShortenedUrlRepository } from '../../../repository/useCases/check-available-shortened-url.repository';

export class CheckAvailableShortenedUrlRepositoryMock
  implements CheckAvailableShortenedUrlRepository
{
  count = 0;
  response = true;
  async check(_shortCode: string): Promise<boolean> {
    this.count++;
    return this.response;
  }
}
