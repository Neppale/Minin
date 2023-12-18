/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../../../models/create-user.dto';
import { CreateUserRepository } from '../../../repository/useCases/create-user.repository';

export class CreateUserRepositoryMock implements CreateUserRepository {
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
  async create({
    email: _email,
    password: _password,
  }: CreateUserDto): Promise<User> {
    this.count++;
    return this.response;
  }
}
