import { Request } from 'express';

export interface CreateClickDataFromRequest {
  create(request: Request): Promise<void>;
}
