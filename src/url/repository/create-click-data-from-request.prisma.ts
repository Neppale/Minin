import { Injectable } from '@nestjs/common';
import { CreateClickDataFromRequestRepository } from './useCases/create-click-data-from-request.repository';
import { Click, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class CreateClickDataFromRequestPrisma
  implements CreateClickDataFromRequestRepository
{
  prisma: PrismaClient;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(
    {
      ip,
      browser,
      operationalSystem,
      device,
      deviceVendor,
      deviceModel,
      platform,
      referrer,
      userAgent,
      asn,
      city,
      country,
      latitude,
      longitude,
      locationRadius,
      postalCode,
      region,
      timezone,
      tags,
      isp,
      location,
    }: Click,
    shortCode: string,
  ): Promise<Click> {
    return await this.prisma.click.create({
      data: {
        ip,
        browser,
        operationalSystem,
        device,
        deviceVendor,
        deviceModel,
        platform,
        referrer,
        userAgent,
        asn,
        city,
        country,
        latitude,
        longitude,
        locationRadius,
        postalCode,
        region,
        timezone,
        tags,
        isp,
        location,
        url: {
          connect: {
            shortCode,
          },
        },
      },
    });
  }
}
