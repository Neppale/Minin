import { Injectable } from '@nestjs/common';
import { CreateClickDataFromRequestRepository } from './useCases/create-click-data-from-request.repository';
import { Click, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class CreateClickDataFromRequestPrisma
  implements CreateClickDataFromRequestRepository
{
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(click: Click): Promise<Click> {
    return this.prisma.click.create({
      data: click,
    });
  }
}
