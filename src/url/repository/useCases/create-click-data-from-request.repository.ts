import { Click } from '@prisma/client';

export interface CreateClickDataFromRequestRepository {
  create(click: Click): Promise<Click>;
}
