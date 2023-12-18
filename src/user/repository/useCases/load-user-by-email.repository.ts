import { User } from '@prisma/client';

export interface LoadUserByEmailRepository {
  load(email: string): Promise<User>;
}
