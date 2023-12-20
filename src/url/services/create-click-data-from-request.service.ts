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
    const { device, browser, engine, os } = userAgentParser.getResult();

    const ip = '191.205.50.52';
    const {
      asn,
      city,
      country,
      isp,
      latitude,
      longitude,
      locationRadius,
      postalCode,
      region,
      timezone,
      location,
    } = await this.getLocationDataFromIpService.get(ip);

    const clickData: Click = {
      ip,
      browser: `${browser?.name} ${browser?.version}`,
      operationalSystem: `${os?.name} ${os?.version}`,
      device: device?.type,
      deviceVendor: device?.vendor,
      deviceModel: device?.model,
      platform: engine?.name,
      referrer: request.headers.referer,
      userAgent: request.headers['user-agent'],
      location,
      isp,
      asn,
      city,
      country,
      latitude: Number(latitude),
      longitude: Number(longitude),
      locationRadius,
      createdAt: new Date(),
      postalCode,
      region,
      tags: [], // TODO: implement tag system based on referrer. ex: social media, search engine, etc
      timezone,
      urlId: undefined,
      id: undefined,
      updatedAt: undefined,
    };
    const shortCode = request.url.split('/').pop();

    await this.createClickDataFromRequestRepository.create(
      clickData,
      shortCode,
    );
  }
}
