import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { CreateShortenedUrl } from './services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './models/dto/create-shortened-url.dto';
import { Url } from '@prisma/client';
import { GetOriginalUrlByShortCode } from './services/useCases/get-original-url-by-short-code';
import { GetOriginalUrlByShortCodeService } from './services/get-original-url-by-short-code.service';
import { Response } from 'express';

@Controller()
export class UrlController {
  createShortenedUrlService: CreateShortenedUrl;
  getOriginalUrlByShortCodeService: GetOriginalUrlByShortCode;
  constructor(
    createShortenedUrlService: CreateShortenedUrlService,
    getOriginalUrlByShortCodeService: GetOriginalUrlByShortCodeService,
  ) {
    this.createShortenedUrlService = createShortenedUrlService;
    this.getOriginalUrlByShortCodeService = getOriginalUrlByShortCodeService;
  }

  @Post()
  async create(@Body() { url }: CreateShortenedUrlDto): Promise<Url> {
    return this.createShortenedUrlService.create(url);
  }

  @Get(':shortCode')
  async get(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    const originalUrl = await this.getOriginalUrlByShortCodeService.get(
      shortCode,
    );
    res.redirect(originalUrl);
  }
}
