import { UrlNotFoundError } from "../../utils/handlers/error.handler";
import { UrlRepository } from "../../infra/database/drizzle/url.repository";
import { UrlRepositoryPort } from "../ports/url-repository.port";
import { CachePort } from "../ports/cache.port";
import { Url } from "../entities/url.entity";
import { RedisDB } from "../../infra/cache/redis/client";

export class LoadUrl {
  urlRepository: UrlRepositoryPort
  cache: CachePort
  constructor(urlRepository: UrlRepository, cache: RedisDB) {
    this.urlRepository = urlRepository;
    this.cache = cache;
  }

  async load(id: string) {
    const cachedUrl = await this.cache.get(id);
    if (cachedUrl) {
      return JSON.parse(cachedUrl) as Url;
    }
    const url = await this.urlRepository.load(id);
    if (!url) {
      throw new UrlNotFoundError();
    }
    return url;
  }
}