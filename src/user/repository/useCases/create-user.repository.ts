import { User } from '@prisma/client';
import { CreateUserDto } from '../../models/create-user.dto';

export interface CreateUserRepository {
  create({ email, password }: CreateUserDto): Promise<User>;
}
