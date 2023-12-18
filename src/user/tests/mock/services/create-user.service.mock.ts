/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { CreateUserDto } from '../../../models/create-user.dto';
import { CreateUserService } from '../../../services/create-user.service';
import { CreateUserRepository } from '../../../repository/useCases/create-user.repository';
import { LoadUserByEmailRepository } from '../../../repository/useCases/load-user-by-email.repository';

export class CreateUserServiceMock implements CreateUserService {
  createUserRepository: CreateUserRepository;
  loadUserByEmailRepository: LoadUserByEmailRepository;

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
