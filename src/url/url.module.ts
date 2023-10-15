import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/services/prisma.service';
import { CheckAvailableShortenedUrlPrisma } from './repository/check-available-shortened-url.prisma';
import { CreateShortenedUrlPrisma } from './repository/create-shortened-url.prisma';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { UrlController } from './url.controller';
import { GetOriginalUrlByShortCodeService } from './services/get-original-url-by-short-code.service';
import { GetOriginalUrlByShortCodePrisma } from './repository/get-original-url-by-short-code.prisma';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    PrismaService,
    CreateShortenedUrlService,
    CheckAvailableShortenedUrlPrisma,
    CreateShortenedUrlPrisma,
    GetOriginalUrlByShortCodePrisma,
    GetOriginalUrlByShortCodeService,
  ],
})
export class UrlModule {}
