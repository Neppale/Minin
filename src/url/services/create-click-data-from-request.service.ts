import { Injectable } from '@nestjs/common';
import { Click } from '@prisma/client';
import { CreateClickDataFromRequestPrisma } from '../repository/create-click-data-from-request.prisma';
import { CreateClickDataFromRequestRepository } from '../repository/useCases/create-click-data-from-request.repository';
import { CreateClickDataFromRequest } from './useCases/create-click-data-from-request';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import { GetLocationDataFromIp } from './useCases/get-location-data-from-ip';
import { GetLocationDataFromIpService } from './get-location-data-from-ip.service';

@Injectable()
export class CreateClickDataFromRequestService
  implements CreateClickDataFromRequest
{
  createClickDataFromRequestRepository: CreateClickDataFromRequestRepository;
  getLocationDataFromIpService: GetLocationDataFromIp;
  constructor(
    createClickDataFromRequestRepository: CreateClickDataFromRequestPrisma,
    getLocationDataFromIpService: GetLocationDataFromIpService,
  ) {
    this.createClickDataFromRequestRepository =
      createClickDataFromRequestRepository;
    this.getLocationDataFromIpService = getLocationDataFromIpService;
  }

  async create(request: Request): Promise<void> {
    const userAgent = request.headers['user-agent'];
    const userAgentParser = new UAParser(userAgent);
    const userAgentData = userAgentParser.getResult();

    const ip = request.ip;
    const locationData = await this.getLocationDataFromIpService.get(ip);

    const clickData: Click = {
      ip: request.ip,
      browser: `${userAgentData.browser.name} ${userAgentData.browser.version}`,
      operationalSystem: `${userAgentData.os.name} ${userAgentData.os.version}`,
      device: userAgentData.device.type,
      deviceVendor: userAgentData.device.vendor,
      deviceModel: userAgentData.device.model,
      platform: userAgentData.engine.name,
      referrer: request.headers.referer,
      userAgent: request.headers['user-agent'],
      asn: locationData.asn,
      city: locationData.city,
      country: locationData.country,
      latitude: Number(locationData.latitude),
      longitude: Number(locationData.longitude),
      locationRadius: locationData.locationRadius,
      createdAt: new Date(),
      postalCode: locationData.postalCode,
      region: locationData.region,
      tags: [], // TODO: implement tag system based on referrer. ex: social media, search engine, etc
      timezone: locationData.timezone,
      urlId: undefined,
      id: undefined,
      updatedAt: undefined,
    };

    await this.createClickDataFromRequestRepository.create(clickData);
  }
}
