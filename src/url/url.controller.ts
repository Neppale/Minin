import { Body, Controller, Post } from '@nestjs/common';
import { CreateShortenedUrl } from './services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './models/dto/create-shortened-url.dto';
import { Url } from '@prisma/client';

@Controller()
export class UrlController {
  createShortenedUrlService: CreateShortenedUrl;
  constructor(createShortenedUrlService: CreateShortenedUrlService) {
    this.createShortenedUrlService = createShortenedUrlService;
  }

  @Post()
  async create(@Body() { url }: CreateShortenedUrlDto): Promise<Url> {
    return this.createShortenedUrlService.create(url);
  }
}
