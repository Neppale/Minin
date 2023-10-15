import { Response } from 'express';
import { UrlController } from '../url.controller';
import { CreateShortenedUrlServiceMock } from './mock/services/create-shortened-url.service.mock';
import { GetUrlByShortCodeServiceMock } from './mock/services/get-url-by-short-code.service.mock';

type SutOutput = {
  sut: UrlController;
  getUrlByShortCodeServiceMock: GetUrlByShortCodeServiceMock;
  createShortenedUrlServiceMock: CreateShortenedUrlServiceMock;
};

const makeSut = (): SutOutput => {
  const getUrlByShortCodeServiceMock = new GetUrlByShortCodeServiceMock();
  const createShortenedUrlServiceMock = new CreateShortenedUrlServiceMock();
  const sut = new UrlController(
    createShortenedUrlServiceMock,
    getUrlByShortCodeServiceMock,
  );

  return {
    sut,
    getUrlByShortCodeServiceMock,
    createShortenedUrlServiceMock,
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
});
