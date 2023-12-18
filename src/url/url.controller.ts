/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Res,
  Headers,
} from '@nestjs/common';
import { CreateShortenedUrl } from './services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './models/dto/create-shortened-url.dto';
import { Url } from '@prisma/client';
import { GetUrlByShortCode } from './services/useCases/get-url-by-short-code';
import { GetUrlByShortCodeService } from './services/get-url-by-short-code.service';
import { Response } from 'express';
import { AuthorizationRequired } from '../utils/authorization-required.decorator';
import { GetUrlStatistics } from './services/useCases/get-url-statistics';
import { GetUrlStatisticsService } from './services/get-url-statistics.service';

@Controller()
export class UrlController {
  createShortenedUrlService: CreateShortenedUrl;
  getUrlByShortCodeService: GetUrlByShortCode;
  getUrlStatisticsService: GetUrlStatistics;
  constructor(
    createShortenedUrlService: CreateShortenedUrlService,
    getUrlByShortCodeService: GetUrlByShortCodeService,
    getUrlStatisticsService: GetUrlStatisticsService,
  ) {
    this.createShortenedUrlService = createShortenedUrlService;
    this.getUrlByShortCodeService = getUrlByShortCodeService;
    this.getUrlStatisticsService = getUrlStatisticsService;
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
  @AuthorizationRequired()
  async getStats(
    @Param('shortCode') shortCode: string,
    @Headers('authorization') authorization: string,
  ): Promise<Url> {
    return this.getUrlStatisticsService.get(shortCode, authorization);
  }
}
