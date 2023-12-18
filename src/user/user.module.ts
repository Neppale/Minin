import { Module } from '@nestjs/common';
import { CreateUserPrisma } from './repository/create-user.prisma';
import { LoadUserByEmailPrisma } from './repository/load-user-by-email.prisma';
import { LoadUserByIdPrisma } from './repository/load-user-by-id.prisma';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    LoadUserByEmailPrisma,
    LoadUserByIdPrisma,
    CreateUserPrisma,
    CreateUserService,
    AuthenticateUserService,
  ],
})
export class UserModule {}
