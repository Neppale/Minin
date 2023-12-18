/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthenticateUserDto } from '../../../models/authenticate-user.dto';
import { LoadUserByEmailRepository } from '../../../repository/useCases/load-user-by-email.repository';
import { AuthenticateUserService } from '../../../services/authenticate-user.service';

export class AuthenticateUserServiceMock implements AuthenticateUserService {
  loadUserByEmailRepository: LoadUserByEmailRepository;
  count = 0;
  response = 'any_token';
  async authenticate({
    email: _email,
    password: _password,
  }: AuthenticateUserDto): Promise<string> {
    this.count++;
    return this.response;
  }
}
