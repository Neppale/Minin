/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { LoadUserByIdRepository } from '../../../repository/useCases/load-user-by-id.repository';

export class LoadUserByIdRepositoryMock implements LoadUserByIdRepository {
  count = 0;
  response = {
    id: 1,
    email: 'any_email',
    password: 'any_password',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  async load(_id: number): Promise<User> {
    this.count++;
    return this.response;
  }
}
