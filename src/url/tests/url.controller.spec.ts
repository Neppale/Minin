import { Response } from 'express';
import { UrlController } from '../url.controller';
import { CreateShortenedUrlServiceMock } from './mock/services/create-shortened-url.service.mock';
import { GetOriginalUrlByShortCodeServiceMock } from './mock/services/get-original-url-by-short-code.service.mock';

type SutOutput = {
  sut: UrlController;
  getOriginalUrlByShortCodeServiceMock: GetOriginalUrlByShortCodeServiceMock;
  createShortenedUrlServiceMock: CreateShortenedUrlServiceMock;
};

const makeSut = (): SutOutput => {
  const getOriginalUrlByShortCodeServiceMock =
    new GetOriginalUrlByShortCodeServiceMock();
  const createShortenedUrlServiceMock = new CreateShortenedUrlServiceMock();
  const sut = new UrlController(
    createShortenedUrlServiceMock,
    getOriginalUrlByShortCodeServiceMock,
  );

  return {
    sut,
    getOriginalUrlByShortCodeServiceMock,
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
    const { sut, getOriginalUrlByShortCodeServiceMock } = makeSut();
    const response: Response = {
      redirect: jest.fn(),
    } as unknown as Response<any>;

    sut.get('abc123', response);

    expect(getOriginalUrlByShortCodeServiceMock.count).toBe(1);
  });
});
