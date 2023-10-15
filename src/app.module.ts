import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateShortenedUrlService } from './url/services/create-shortened-url.service';
import { CheckAvailableShortenedUrlPrisma } from './url/repository/check-available-shortened-url.prisma';
import { CreateShortenedUrlPrisma } from './url/repository/create-shortened-url.prisma';
import { PrismaService } from './prisma/services/prisma.service';

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
export class AppModule {}
