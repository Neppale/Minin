import { Response } from 'express';
import { UrlController } from '../url.controller';
import { CreateShortenedUrlServiceMock } from './mock/services/create-shortened-url.service.mock';
import { GetUrlByShortCodeServiceMock } from './mock/services/get-url-by-short-code.service.mock';
import { GetUrlStatisticsServiceMock } from './mock/services/get-url-statistics.service.mock';

type SutOutput = {
  sut: UrlController;
  getUrlByShortCodeServiceMock: GetUrlByShortCodeServiceMock;
  createShortenedUrlServiceMock: CreateShortenedUrlServiceMock;
  getUrlStatisticsServiceMock: GetUrlStatisticsServiceMock;
};

const makeSut = (): SutOutput => {
  const getUrlByShortCodeServiceMock = new GetUrlByShortCodeServiceMock();
  const createShortenedUrlServiceMock = new CreateShortenedUrlServiceMock();
  const getUrlStatisticsServiceMock = new GetUrlStatisticsServiceMock();
  const sut = new UrlController(
    createShortenedUrlServiceMock,
    getUrlByShortCodeServiceMock,
    getUrlStatisticsServiceMock,
  );

  return {
    sut,
    getUrlByShortCodeServiceMock,
    createShortenedUrlServiceMock,
    getUrlStatisticsServiceMock,
  };
};

describe('UrlController', () => {
  it('should call createShortenedUrlService.create once', () => {
    const { sut, createShortenedUrlServiceMock } = makeSut();

    sut.create({ url: 'https://www.google.com' });

    expect(createShortenedUrlServiceMock.createCount).toBe(1);
  });

  it('should call getOriginalUrlByShortCodeService.get once', () => {
    const { sut, getUrlByShortCodeServiceMock } = makeSut();
    const response: Response = {
      redirect: jest.fn(),
    } as unknown as Response<any>;

    sut.get('abc123', response);

    expect(getUrlByShortCodeServiceMock.count).toBe(1);
  });

  it('should call getUrlStatisticsService.get once using getStats', () => {
    const { sut, getUrlStatisticsServiceMock } = makeSut();

    sut.getStats('abc123', 'Bearer token');

    expect(getUrlStatisticsServiceMock.count).toBe(1);
  });
});
