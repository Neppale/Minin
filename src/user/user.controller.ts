import { Body, Controller, Delete, Param, Post, Headers } from '@nestjs/common';
import { CreateUser } from './services/useCases/create-user';
import { CreateUserService } from './services/create-user.service';
import { DeactivateUserService } from './services/deactivate-user.service';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { AuthenticateUser } from './services/useCases/authenticate-user';
import { DeactivateUser } from './services/useCases/deactivate-user';
import { User } from '@prisma/client';
import { AuthenticateUserDto } from './models/authenticate-user.dto';
import { CreateUserDto } from './models/create-user.dto';
import { AuthorizationRequired } from '../utils/authorization-required.decorator';
import { UserIdDto } from './models/user-id.dto';

@Controller('user')
export class UserController {
  createUserService: CreateUser;
  deactivateUserService: DeactivateUser;
  authenticateUserService: AuthenticateUser;

  constructor(
    createUserService: CreateUserService,
    deactivateUserService: DeactivateUserService,
    authenticateUserService: AuthenticateUserService,
  ) {
    this.createUserService = createUserService;
    this.deactivateUserService = deactivateUserService;
    this.authenticateUserService = authenticateUserService;
  }

  @Post()
  async create(@Body() { email, password }: CreateUserDto): Promise<User> {
    return this.createUserService.create({ email, password });
  }

  @Delete(':id')
  @AuthorizationRequired()
  async deactivate(
    @Param() { id }: UserIdDto,
    @Headers('authorization') authorization: string,
  ): Promise<void> {
    return this.deactivateUserService.deactivate(id, authorization);
  }

  @Post('authenticate')
  async authenticate(
    @Body() { email, password }: AuthenticateUserDto,
  ): Promise<string> {
    return this.authenticateUserService.authenticate({ email, password });
  }
}
