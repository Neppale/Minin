import { describe, expect, it, mock } from "bun:test";
import { LoadUrl } from "../useCases/load-url";
import { UrlNotFoundError } from "../../utils/handlers/error.handler";
import type { Url } from "../entities/url.entity";
import type { UrlRepositoryPort } from "../ports/url-repository.port";

function makeUrlRepository(load: UrlRepositoryPort["load"]): UrlRepositoryPort {
  return {
    create: mock(() =>
      Promise.resolve({
        id: "",
        originalUrl: "",
        createdAt: new Date(),
      })
    ),
    load,
  };
}

describe("LoadUrl", () => {
  it("should call urlRepository.load once when load is called", async () => {
    const url: Url = {
      id: "abc123",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const loadMock = mock(() => Promise.resolve(url));
    const urlRepository = makeUrlRepository(loadMock);
    const useCase = new LoadUrl(urlRepository);

    await useCase.load("abc123");

    expect(loadMock).toHaveBeenCalledTimes(1);
  });

  it("should pass id to urlRepository.load when load is called", async () => {
    const url: Url = {
      id: "abc123",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const loadMock = mock(() => Promise.resolve(url));
    const urlRepository = makeUrlRepository(loadMock);
    const useCase = new LoadUrl(urlRepository);

    await useCase.load("abc123");

    expect(loadMock).toHaveBeenCalledWith("abc123");
  });

  it("should return the URL when urlRepository.load returns a url", async () => {
    const url: Url = {
      id: "abc123",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    };
    const loadMock = mock(() => Promise.resolve(url));
    const urlRepository = makeUrlRepository(loadMock);
    const useCase = new LoadUrl(urlRepository);

    const result = await useCase.load("abc123");

    expect(result).toEqual(url);
  });

  it("should throw UrlNotFoundError when urlRepository.load returns null", async () => {
    const loadMock = mock(() => Promise.resolve(null));
    const urlRepository = makeUrlRepository(loadMock);
    const useCase = new LoadUrl(urlRepository);

    await expect(useCase.load("missing-id")).rejects.toThrow(UrlNotFoundError);
  });
});
