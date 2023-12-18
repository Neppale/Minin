import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeactivateUserRepository } from './useCases/deactivate-user.repository';

@Injectable()
export class DeactivateUserPrisma implements DeactivateUserRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async deactivate(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }
}
