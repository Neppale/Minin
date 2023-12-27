import { Request, Response } from 'express';
import { UrlController } from '../url.controller';
import { CreateShortenedUrlServiceMock } from './mock/services/create-shortened-url.service.mock';
import { RedirectToUrlServiceMock } from './mock/services/redirect-to-url.service.mock';
import { GetUrlStatisticsServiceMock } from './mock/services/get-url-statistics.service.mock';

type SutOutput = {
  sut: UrlController;
  redirectToUrlServiceMock: RedirectToUrlServiceMock;
  createShortenedUrlServiceMock: CreateShortenedUrlServiceMock;
  getUrlStatisticsServiceMock: GetUrlStatisticsServiceMock;
};

const makeSut = (): SutOutput => {
  const redirectToUrlServiceMock = new RedirectToUrlServiceMock();
  const createShortenedUrlServiceMock = new CreateShortenedUrlServiceMock();
  const getUrlStatisticsServiceMock = new GetUrlStatisticsServiceMock();
  const sut = new UrlController(
    createShortenedUrlServiceMock,
    redirectToUrlServiceMock,
    getUrlStatisticsServiceMock,
  );

  return {
    sut,
    redirectToUrlServiceMock,
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

  it('should call redirectToUrlServiceMock.get once', () => {
    const { sut, redirectToUrlServiceMock } = makeSut();
    const response: Response = {
      redirect: jest.fn(),
    } as unknown as Response<any>;
    const request: Request = {
      headers: {},
    } as unknown as Request<any>;

    sut.get('abc123', request, response);
    expect(redirectToUrlServiceMock.count).toBe(1);
  });
});

it('should call getUrlStatisticsService.get once using getStats', () => {
  const { sut, getUrlStatisticsServiceMock } = makeSut();

  sut.getStats('abc123', 'Bearer token');

  expect(getUrlStatisticsServiceMock.count).toBe(1);
});
