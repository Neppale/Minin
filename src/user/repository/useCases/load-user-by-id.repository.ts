import { User } from '@prisma/client';

export interface LoadUserByIdRepository {
  load(id: number): Promise<User>;
}
