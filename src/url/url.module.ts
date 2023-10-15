import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/services/prisma.service';
import { CheckAvailableShortenedUrlPrisma } from './repository/check-available-shortened-url.prisma';
import { CreateShortenedUrlPrisma } from './repository/create-shortened-url.prisma';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { UrlController } from './url.controller';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    PrismaService,
    CreateShortenedUrlService,
    CheckAvailableShortenedUrlPrisma,
    CreateShortenedUrlPrisma,
  ],
})
export class UrlModule {}
