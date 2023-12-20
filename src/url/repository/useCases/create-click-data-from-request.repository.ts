import { Click } from '@prisma/client';

export interface CreateClickDataFromRequestRepository {
  create(click: Click, shortCode: string): Promise<Click>;
}
