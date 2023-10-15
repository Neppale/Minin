import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { CreateShortenedUrl } from './services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './models/dto/create-shortened-url.dto';
import { Url } from '@prisma/client';
import { GetUrlByShortCode } from './services/useCases/get-url-by-short-code';
import { GetUrlByShortCodeService } from './services/get-url-by-short-code.service';
import { Response } from 'express';

@Controller()
export class UrlController {
  createShortenedUrlService: CreateShortenedUrl;
  getUrlByShortCodeService: GetUrlByShortCode;
  constructor(
    createShortenedUrlService: CreateShortenedUrlService,
    getUrlByShortCodeService: GetUrlByShortCodeService,
  ) {
    this.createShortenedUrlService = createShortenedUrlService;
    this.getUrlByShortCodeService = getUrlByShortCodeService;
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
    const url = await this.getUrlByShortCodeService.get(shortCode);
    res.redirect(url.originalUrl);
  }

  @Get('stats/:shortCode')
  async getStats(@Param('shortCode') shortCode: string): Promise<Url> {
    return this.getUrlByShortCodeService.get(shortCode);
  }
}
