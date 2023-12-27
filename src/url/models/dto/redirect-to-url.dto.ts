import { IsNotEmpty, IsString } from 'class-validator';
import { Request, Response } from 'express';

export class RedirectToUrlDto {
  @IsString()
  @IsNotEmpty()
  shortCode: string;
  request: Request;
  response: Response;
}
