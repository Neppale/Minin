import { Injectable, NotFoundException } from '@nestjs/common';
import { DeactivateUser } from './useCases/deactivate-user';
import { LoadUserByIdRepository } from '../repository/useCases/load-user-by-id.repository';
import { DeactivateUserRepository } from '../repository/useCases/deactivate-user.repository';
import { LoadUserByIdPrisma } from '../repository/load-user-by-id.prisma';
import { DeactivateUserPrisma } from '../repository/deactivate-user.prisma';

@Injectable()
export class DeactivateUserService implements DeactivateUser {
  loadUserByIdRepository: LoadUserByIdRepository;
  deactivateUserRepository: DeactivateUserRepository;

  constructor(
    loadUserByIdRepository: LoadUserByIdPrisma,
    deactivateUserRepository: DeactivateUserPrisma,
  ) {
    this.loadUserByIdRepository = loadUserByIdRepository;
    this.deactivateUserRepository = deactivateUserRepository;
  }

  async deactivate(id: number): Promise<void> {
    const user = await this.loadUserByIdRepository.load(id);
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }
    await this.deactivateUserRepository.deactivate(id);
  }
}
