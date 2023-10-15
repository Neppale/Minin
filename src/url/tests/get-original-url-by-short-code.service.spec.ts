import { GetOriginalUrlByShortCodeService } from '../services/get-original-url-by-short-code.service';
import { GetOriginalUrlByShortCodeRepositoryMock } from './mock/repository/get-original-url-by-short-code.repository.mock';

type SutOutput = {
  sut: GetOriginalUrlByShortCodeService;
  getOriginalUrlByShortCodeRepositoryMock: GetOriginalUrlByShortCodeRepositoryMock;
};

const makeSut = (): SutOutput => {
  const getOriginalUrlByShortCodeRepositoryMock =
    new GetOriginalUrlByShortCodeRepositoryMock();
  const sut = new GetOriginalUrlByShortCodeService(
    getOriginalUrlByShortCodeRepositoryMock,
  );

  return {
    sut,
    getOriginalUrlByShortCodeRepositoryMock,
  };
};

describe('GetOriginalUrlByShortCodeService', () => {
  it('should call getOriginalUrlByShortCodeRepository.get once', async () => {
    const { sut, getOriginalUrlByShortCodeRepositoryMock } = makeSut();

    await sut.get('abc123');

    expect(getOriginalUrlByShortCodeRepositoryMock.count).toBe(1);
  });
});
