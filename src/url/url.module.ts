import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/services/prisma.service';
import { CheckAvailableShortenedUrlPrisma } from './repository/check-available-shortened-url.prisma';
import { CreateShortenedUrlPrisma } from './repository/create-shortened-url.prisma';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { UrlController } from './url.controller';
import { GetUrlByShortCodeService } from './services/get-url-by-short-code.service';
import { GetUrlByShortCodePrisma } from './repository/get-url-by-short-code.prisma';
import { GetUrlStatisticsService } from './services/get-url-statistics.service';
import { CreateClickDataFromRequestPrisma } from './repository/create-click-data-from-request.prisma';
import { GetLocationDataFromIpService } from './services/get-location-data-from-ip.service';
import { RedirectToUrlService } from './services/redirect-to-url.service';
import { CreateClickDataFromRequestService } from './services/create-click-data-from-request.service';
import { GetUrlStatisticsPrisma } from './repository/get-url-statistics.prisma';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    PrismaService,
    CreateShortenedUrlService,
    CheckAvailableShortenedUrlPrisma,
    CreateShortenedUrlPrisma,
    GetUrlByShortCodePrisma,
    GetUrlByShortCodeService,
    GetUrlStatisticsService,
    CreateClickDataFromRequestPrisma,
    CreateClickDataFromRequestService,
    GetLocationDataFromIpService,
    RedirectToUrlService,
    GetUrlStatisticsPrisma,
  ],
})
export class UrlModule {}
