import { UrlNotFoundError } from "../../utils/handlers/error.handler";
import { UrlRepositoryPort } from "../ports/url-repository.port";

export class LoadUrl {
  constructor(private urlRepository: UrlRepositoryPort) {}

  async load(id: string) {
    const url = await this.urlRepository.load(id);
    if (!url) {
      throw new UrlNotFoundError();
    }
    return url;
  }
}
