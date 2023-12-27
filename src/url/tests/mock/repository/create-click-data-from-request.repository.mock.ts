/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Click } from '@prisma/client';
import { CreateClickDataFromRequestPrisma } from '../../../repository/create-click-data-from-request.prisma';

export class CreateClickDataFromRequestRepositoryMock
  implements CreateClickDataFromRequestPrisma
{
  prisma: PrismaClient;
  count = 0;
  response = {
    id: 1,
    ip: 'ip',
    browser: 'browser',
    operationalSystem: 'operationalSystem',
    device: 'device',
    deviceVendor: 'deviceVendor',
    deviceModel: 'deviceModel',
    platform: 'platform',
    referrer: 'referrer',
    userAgent: 'userAgent',
    location: 'location',
    isp: 'isp',
    asn: 'asn',
    city: 'city',
    country: 'country',
    latitude: 0,
    longitude: 0,
    urlId: 1,
    region: 'region',
    postalCode: 'postalCode',
    locationRadius: 'locationRadius',
    timezone: 'timezone',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  async create(_params: Click, _shortCode: string): Promise<Click> {
    this.count++;
    return this.response;
  }
}
