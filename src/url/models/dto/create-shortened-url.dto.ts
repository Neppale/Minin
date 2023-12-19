import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
    require_tld: true,
    require_valid_protocol: true,
  })
  url: string;
}
