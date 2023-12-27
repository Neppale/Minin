import { RedirectToUrlService } from '../../services/redirect-to-url.service';
import { GetUrlByShortCodeRepositoryMock } from '../mock/repository/get-url-by-short-code.repository.mock';
import { CreateClickDataFromRequestServiceMock } from '../mock/services/create-click-data-from-request.service.mock';
import { Request, Response } from 'express';

type SutOutput = {
  sut: RedirectToUrlService;
  getUrlByShortCodeRepositoryMock: GetUrlByShortCodeRepositoryMock;
  createClickDataFromRequestServiceMock: CreateClickDataFromRequestServiceMock;
};

const makeSut = (): SutOutput => {
  const getUrlByShortCodeRepositoryMock = new GetUrlByShortCodeRepositoryMock();
  const createClickDataFromRequestServiceMock =
    new CreateClickDataFromRequestServiceMock();
  const sut = new RedirectToUrlService(
    getUrlByShortCodeRepositoryMock,
    createClickDataFromRequestServiceMock,
  );
  return {
    sut,
    getUrlByShortCodeRepositoryMock,
    createClickDataFromRequestServiceMock,
  };
};

describe('RedirectToUrlService', () => {
  it('should call getUrlByShortCodeRepositoryMock once', () => {
    const { sut, getUrlByShortCodeRepositoryMock } = makeSut();
    sut.redirect({
      shortCode: 'any_code',
      request: {} as Request,
      response: {
        redirect: jest.fn(),
      } as unknown as Response,
    });
    expect(getUrlByShortCodeRepositoryMock.count).toBe(1);
  });

  it('should throw if getUrlByShortCodeRepositoryMock returns null', async () => {
    const { sut, getUrlByShortCodeRepositoryMock } = makeSut();
    getUrlByShortCodeRepositoryMock.response = null;
    await expect(
      sut.redirect({
        shortCode: 'any_code',
        request: {} as Request,
        response: {
          redirect: jest.fn(),
        } as unknown as Response,
      }),
    ).rejects.toThrow();
  });

  it('should call createClickDataFromRequestServiceMock once', async () => {
    const { sut, createClickDataFromRequestServiceMock } = makeSut();
    await sut.redirect({
      shortCode: 'any_code',
      request: {} as Request,
      response: {
        redirect: jest.fn(),
      } as unknown as Response,
    });
    expect(createClickDataFromRequestServiceMock.count).toBe(1);
  });
});
