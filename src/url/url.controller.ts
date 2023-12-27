/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Res,
  Headers,
  Req,
} from '@nestjs/common';
import { CreateShortenedUrl } from './services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './models/dto/create-shortened-url.dto';
import { Url } from '@prisma/client';
import { AuthorizationRequired } from '../utils/authorization-required.decorator';
import { GetUrlStatistics } from './services/useCases/get-url-statistics';
import { GetUrlStatisticsService } from './services/get-url-statistics.service';
import { RedirectToUrl } from './services/useCases/redirect-to-url';
import { RedirectToUrlService } from './services/redirect-to-url.service';
import { Request, Response } from 'express';
import { UrlStatistics } from './models/url-statistics.model';

@Controller()
export class UrlController {
  createShortenedUrlService: CreateShortenedUrl;
  redirectToUrlService: RedirectToUrl;
  getUrlStatisticsService: GetUrlStatistics;
  constructor(
    createShortenedUrlService: CreateShortenedUrlService,
    redirectToUrlService: RedirectToUrlService,
    getUrlStatisticsService: GetUrlStatisticsService,
  ) {
    this.createShortenedUrlService = createShortenedUrlService;
    this.redirectToUrlService = redirectToUrlService;
    this.getUrlStatisticsService = getUrlStatisticsService;
  }

  @Post()
  async create(@Body() { url }: CreateShortenedUrlDto): Promise<Url> {
    return this.createShortenedUrlService.create(url);
  }

  @Get(':shortCode')
  async get(
    @Param('shortCode') shortCode: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    await this.redirectToUrlService.redirect({
      shortCode,
      request,
      response,
    });
  }

  @Get('stats/:shortCode')
  @AuthorizationRequired()
  async getStats(
    @Param('shortCode') shortCode: string,
    @Headers('authorization') authorization: string,
  ): Promise<UrlStatistics> {
    return this.getUrlStatisticsService.get(shortCode, authorization);
  }
}
