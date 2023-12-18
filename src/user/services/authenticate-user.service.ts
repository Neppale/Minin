import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticateUser } from './useCases/authenticate-user';
import { AuthenticateUserDto } from '../models/authenticate-user.dto';
import { LoadUserByEmailPrisma } from '../repository/load-user-by-email.prisma';
import { LoadUserByEmailRepository } from '../repository/useCases/load-user-by-email.repository';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

@Injectable()
export class AuthenticateUserService implements AuthenticateUser {
  loadUserByEmailRepository: LoadUserByEmailRepository;

  constructor(loadUserByEmailRepository: LoadUserByEmailPrisma) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }

  async authenticate({
    email,
    password,
  }: AuthenticateUserDto): Promise<string> {
    const message = 'Wrong credentials';

    const user = await this.loadUserByEmailRepository.load(email);
    if (!user) {
      throw new BadRequestException({
        message,
      });
    }

    const isPasswordValid = compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException({
        message,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return token;
  }
}
