import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
