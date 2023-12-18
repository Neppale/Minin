import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUser } from './useCases/create-user';
import { LoadUserByEmailRepository } from '../repository/useCases/load-user-by-email.repository';
import { CreateUserRepository } from '../repository/useCases/create-user.repository';
import { CreateUserPrisma } from '../repository/create-user.prisma';
import { LoadUserByEmailPrisma } from '../repository/load-user-by-email.prisma';
import { CreateUserDto } from '../models/create-user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService implements CreateUser {
  createUserRepository: CreateUserRepository;
  loadUserByEmailRepository: LoadUserByEmailRepository;

  constructor(
    createUserRepository: CreateUserPrisma,
    loadUserByEmailRepository: LoadUserByEmailPrisma,
  ) {
    this.createUserRepository = createUserRepository;
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }
  async create({ email, password }: CreateUserDto): Promise<User> {
    const existingUser = await this.loadUserByEmailRepository.load(email);
    if (existingUser) {
      throw new ConflictException({
        message: 'This email is already in use',
      });
    }
    const hashedPassword = await hash(password, 12);
    const createdUser = await this.createUserRepository.create({
      email,
      password: hashedPassword,
    });
    return {
      ...createdUser,
      password: undefined,
    };
  }
}
