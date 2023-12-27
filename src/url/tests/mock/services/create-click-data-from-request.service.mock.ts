/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Click } from '@prisma/client';
import { CreateClickDataFromRequestService } from '../../../services/create-click-data-from-request.service';
import { Request } from 'express';
import { CreateClickDataFromRequestRepository } from '../../../repository/useCases/create-click-data-from-request.repository';
import { GetLocationDataFromIp } from '../../../services/useCases/get-location-data-from-ip';

export class CreateClickDataFromRequestServiceMock
  implements CreateClickDataFromRequestService
{
  createClickDataFromRequestRepository: CreateClickDataFromRequestRepository;
  getLocationDataFromIpService: GetLocationDataFromIp;
  prisma: PrismaClient;
  count = 0;
  async create(_request: Request): Promise<void> {
    this.count++;
    return;
  }
}
