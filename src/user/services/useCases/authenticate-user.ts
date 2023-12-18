import { AuthenticateUserDto } from '../../models/authenticate-user.dto';

export interface AuthenticateUser {
  authenticate({ email, password }: AuthenticateUserDto): Promise<string>;
}
