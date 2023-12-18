/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeactivateUserRepository } from '../../../repository/useCases/deactivate-user.repository';
import { LoadUserByIdRepository } from '../../../repository/useCases/load-user-by-id.repository';
import { DeactivateUserService } from '../../../services/deactivate-user.service';

export class DeactivateUserServiceMock implements DeactivateUserService {
  loadUserByIdRepository: LoadUserByIdRepository;
  deactivateUserRepository: DeactivateUserRepository;

  count = 0;
  async deactivate(_id: number): Promise<void> {
    this.count++;
  }
}
