/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { DeactivateUserRepository } from '../../../repository/useCases/deactivate-user.repository';

export class DeactivateUserRepositoryMock implements DeactivateUserRepository {
  prisma: PrismaClient;
  count = 0;
  async deactivate(_id: number): Promise<void> {
    this.count++;
  }
}
