import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeactivateUser } from './useCases/deactivate-user';
import { LoadUserByIdRepository } from '../repository/useCases/load-user-by-id.repository';
import { DeactivateUserRepository } from '../repository/useCases/deactivate-user.repository';
import { LoadUserByIdPrisma } from '../repository/load-user-by-id.prisma';
import { DeactivateUserPrisma } from '../repository/deactivate-user.prisma';
import { decode } from 'jsonwebtoken';

@Injectable()
export class DeactivateUserService implements DeactivateUser {
  loadUserByIdRepository: LoadUserByIdRepository;
  deactivateUserRepository: DeactivateUserRepository;

  constructor(
    loadUserByIdRepository: LoadUserByIdPrisma,
    deactivateUserRepository: DeactivateUserPrisma,
  ) {
    this.loadUserByIdRepository = loadUserByIdRepository;
    this.deactivateUserRepository = deactivateUserRepository;
  }

  async deactivate(id: number, authorization: string): Promise<void> {
    const user = await this.loadUserByIdRepository.load(id);
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    const token = authorization.split(' ')[1];
    const userToken = decode(token) as {
      id: number;
      exp: number;
      iat: number;
    };

    if (userToken.id != user.id) {
      throw new UnauthorizedException({
        message: 'You are not allowed to see the statistics of this URL.',
      });
    }
    await this.deactivateUserRepository.deactivate(id);
  }
}
