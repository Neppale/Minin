import { Body, Controller, Post } from '@nestjs/common';
import { CreateShortenedUrl } from './url/services/useCases/create-shortened-url';
import { CreateShortenedUrlService } from './url/services/create-shortened-url.service';
import { CreateShortenedUrlDto } from './url/models/dto/create-shortened-url.dto';
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
