import { CreateAttemptsExceededError } from "../../utils/handlers/error.handler";
import { Url } from "../entities/url.entity";
import { CachePort } from "../ports/cache.port";
import { UrlRepositoryPort } from "../ports/url-repository.port";
import { generateId } from "../../utils/generators/id.generator";

const MAX_ATTEMPTS = 5;
const DEFAULT_CACHE_TTL_SECONDS = 60 * 60; // 1 hour

export class CreateUrl {
  constructor(
    private urlRepository: UrlRepositoryPort,
    private cache: CachePort
  ) {}

  async create(originalUrl: string, expirationDate?: Date): Promise<Url> {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const id = generateId(originalUrl);
      try {
        const createdUrl = await this.urlRepository.create({
          id,
          originalUrl,
          expirationDate,
        });
        await this.cache.set(id, originalUrl, DEFAULT_CACHE_TTL_SECONDS);
        return createdUrl;
      } catch (error: unknown) {
        const formattedError = error as { code?: string };
        if (formattedError.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
          if (attempt === MAX_ATTEMPTS - 1)
            throw new CreateAttemptsExceededError();
          continue;
        }
        throw error;
      }
    }
    throw new CreateAttemptsExceededError();
  }
}
