import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShortenedUrlDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
