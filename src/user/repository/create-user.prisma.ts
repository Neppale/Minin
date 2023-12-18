import { Injectable } from '@nestjs/common';
import { CreateUserRepository } from './useCases/create-user.repository';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';
import { CreateUserDto } from '../models/create-user.dto';

@Injectable()
export class CreateUserPrisma implements CreateUserRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }
  async create({ email, password }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
