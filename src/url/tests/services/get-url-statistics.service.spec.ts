import { GetUrlStatisticsService } from '../../services/get-url-statistics.service';
import { GetUrlByShortCodeRepositoryMock } from '../mock/repository/get-url-by-short-code.repository.mock';

type SutOutput = {
  sut: GetUrlStatisticsService;
  getUrlByShortCodeRepositoryMock: GetUrlByShortCodeRepositoryMock;
};

const makeSut = (): SutOutput => {
  const getUrlByShortCodeRepositoryMock = new GetUrlByShortCodeRepositoryMock();
  const sut = new GetUrlStatisticsService(getUrlByShortCodeRepositoryMock);

  return {
    sut,
    getUrlByShortCodeRepositoryMock,
  };
};

describe('GetUrlStatisticsService', () => {
  it('should call getUrlByShortCodeRepository.get once', async () => {
    const { sut, getUrlByShortCodeRepositoryMock } = makeSut();

    await sut.get(
      'abc123',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTUxNjIzOTAyMn0.T4XSv7tPeAxm7UcH0lTXrSMtuuf8fYIVWkdVO7bIZSI',
    );

    expect(getUrlByShortCodeRepositoryMock.count).toBe(1);
  });

  it('should throw if getUrlByShortCodeRepository.get returns null', async () => {
    const { sut, getUrlByShortCodeRepositoryMock } = makeSut();
    getUrlByShortCodeRepositoryMock.response = null;

    const promise = sut.get('abc123', 'Bearer token');

    await expect(promise).rejects.toThrow();
  });

  it('should throw if userToken.id is different from url.userId', async () => {
    const { sut } = makeSut();

    const promise = sut.get(
      'abc123',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTUxNjIzOTAyMn0.RJyIGHS8PeGn8cBxPsZWCjAKD_A5mmQcXziKoxDOKRY',
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return the url', async () => {
    const { sut } = makeSut();

    const url = await sut.get(
      'abc123',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTUxNjIzOTAyMn0.T4XSv7tPeAxm7UcH0lTXrSMtuuf8fYIVWkdVO7bIZSI',
    );

    expect(url).toBeTruthy();
  });
});
