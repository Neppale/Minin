/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import { LoadUserByEmailRepository } from '../../../repository/useCases/load-user-by-email.repository';

export class LoadUserByEmailRepositoryMock
  implements LoadUserByEmailRepository
{
  prisma: PrismaClient;

  count = 0;
  response = {
    id: 1,
    email: 'any_email',
    password: 'any_password',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  async load(_email: string): Promise<User> {
    this.count++;
    return this.response;
  }
}
