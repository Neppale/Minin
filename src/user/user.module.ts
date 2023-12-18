import { Module } from '@nestjs/common';
import { CreateUserPrisma } from './repository/create-user.prisma';
import { LoadUserByEmailPrisma } from './repository/load-user-by-email.prisma';
import { LoadUserByIdPrisma } from './repository/load-user-by-id.prisma';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/services/prisma.service';
import { DeactivateUserPrisma } from './repository/deactivate-user.prisma';
import { DeactivateUserService } from './services/deactivate-user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    LoadUserByEmailPrisma,
    LoadUserByIdPrisma,
    CreateUserPrisma,
    CreateUserService,
    AuthenticateUserService,
    DeactivateUserPrisma,
    DeactivateUserService,
  ],
})
export class UserModule {}
