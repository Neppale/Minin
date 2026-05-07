import { beforeAll, describe, expect, it, mock } from "bun:test";
import { CreateUrl } from "../useCases/create-url";
import { CreateAttemptsExceededError } from "../../utils/handlers/error.handler";
import type { Url } from "../entities/url.entity";
import type { CachePort } from "../ports/cache.port";
import type { UrlRepositoryPort } from "../ports/url-repository.port";

function makeUrlRepository(
  create: UrlRepositoryPort["create"]
): UrlRepositoryPort {
  return {
    create,
    load: mock(() => Promise.resolve(null)),
  };
}

function makeCache(set: CachePort["set"]): CachePort {
  return {
    set,
    get: mock(() => Promise.resolve(null)),
    del: mock(() => Promise.resolve(0)),
  };
}

describe("CreateUrl", () => {
  beforeAll(() => {
    Bun.env.ID_SECRET_KEY = "test-secret-key";
  });

  it("should call urlRepository.create once when create succeeds on first attempt", async () => {
    const createdUrl: Url = {
      id: "id1",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const createMock = mock(() => Promise.resolve(createdUrl));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(mock(() => Promise.resolve("OK")));
    const useCase = new CreateUrl(urlRepository, cache);

    await useCase.create("https://example.com");

    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it("should call cache.set once when create succeeds", async () => {
    const createdUrl: Url = {
      id: "fixed-id",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };

    const createMock = mock(() => Promise.resolve(createdUrl));
    const setMock = mock(() => Promise.resolve("OK"));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(setMock);
    const useCase = new CreateUrl(urlRepository, cache);

    await useCase.create("https://example.com");

    expect(setMock).toHaveBeenCalledTimes(1);
  });

  it("should return the created URL when create succeeds on first attempt", async () => {
    const createdUrl: Url = {
      id: "id1",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const createMock = mock(() => Promise.resolve(createdUrl));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(mock(() => Promise.resolve("OK")));
    const useCase = new CreateUrl(urlRepository, cache);

    const result = await useCase.create("https://example.com");

    expect(result).toEqual(createdUrl);
  });

  it("should pass originalUrl and optional expirationDate to urlRepository.create when provided", async () => {
    const expirationDate = new Date("2025-12-31");
    const createdUrl: Url = {
      id: "id1",
      originalUrl: "https://example.com",
      expirationDate,
      createdAt: new Date(),
    };
    const createMock = mock(() => Promise.resolve(createdUrl));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(mock(() => Promise.resolve("OK")));
    const useCase = new CreateUrl(urlRepository, cache);

    await useCase.create("https://example.com", expirationDate);

    expect(createMock).toHaveBeenCalledWith({
      id: expect.any(String),
      originalUrl: "https://example.com",
      expirationDate,
    });
  });

  it("should call urlRepository.create multiple times when previous attempts fail with primary key conflict", async () => {
    const createdUrl: Url = {
      id: "id1",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const conflictError = Object.assign(new Error("conflict"), {
      code: "SQLITE_CONSTRAINT_PRIMARYKEY",
    });
    const createMock = mock()
      .mockRejectedValueOnce(conflictError)
      .mockRejectedValueOnce(conflictError)
      .mockResolvedValueOnce(createdUrl);
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(mock(() => Promise.resolve("OK")));
    const useCase = new CreateUrl(urlRepository, cache);

    await useCase.create("https://example.com");

    expect(createMock).toHaveBeenCalledTimes(3);
  });

  it("should throw CreateAttemptsExceededError when all attempts fail with primary key conflict", async () => {
    const conflictError = Object.assign(new Error("conflict"), {
      code: "SQLITE_CONSTRAINT_PRIMARYKEY",
    });
    const createMock = mock(() => Promise.reject(conflictError));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(mock(() => Promise.resolve("OK")));
    const useCase = new CreateUrl(urlRepository, cache);

    await expect(useCase.create("https://example.com")).rejects.toThrow(
      CreateAttemptsExceededError
    );
  });

  it("should not call cache.set when urlRepository.create throws", async () => {
    const createMock = mock(() =>
      Promise.reject(new Error("db connection lost"))
    );
    const setMock = mock(() => Promise.resolve("OK"));
    const urlRepository = makeUrlRepository(createMock);
    const cache = makeCache(setMock);
    const useCase = new CreateUrl(urlRepository, cache);

    await expect(useCase.create("https://example.com")).rejects.toThrow();

    expect(setMock).toHaveBeenCalledTimes(0);
  });
});
