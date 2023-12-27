import { RedirectToUrlDto } from '../../models/dto/redirect-to-url.dto';

export interface RedirectToUrl {
  redirect({ shortCode, request, response }: RedirectToUrlDto): Promise<void>;
}
