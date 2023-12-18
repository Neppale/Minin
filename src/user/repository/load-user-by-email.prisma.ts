import { Injectable } from '@nestjs/common';
import { LoadUserByEmailRepository } from './useCases/load-user-by-email.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class LoadUserByEmailPrisma implements LoadUserByEmailRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async load(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        active: true,
      },
    });
    return user;
  }
}
