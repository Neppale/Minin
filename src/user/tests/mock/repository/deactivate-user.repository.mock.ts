/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeactivateUserRepository } from '../../../repository/useCases/deactivate-user.repository';

export class DeactivateUserRepositoryMock implements DeactivateUserRepository {
  count = 0;
  async deactivate(_id: number): Promise<void> {
    this.count++;
  }
}
