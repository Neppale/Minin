import { Injectable } from '@nestjs/common';
import { LoadUserByIdRepository } from './useCases/load-user-by-id.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class LoadUserByIdPrisma implements LoadUserByIdRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async load(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        active: true,
      },
    });
    return user;
  }
}
