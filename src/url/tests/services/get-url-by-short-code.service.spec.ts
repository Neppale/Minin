import { GetUrlByShortCodeService } from '../../services/get-url-by-short-code.service';
import { GetUrlByShortCodeRepositoryMock } from '../mock/repository/get-url-by-short-code.repository.mock';

type SutOutput = {
  sut: GetUrlByShortCodeService;
  getOriginalUrlByShortCodeRepositoryMock: GetUrlByShortCodeRepositoryMock;
};

const makeSut = (): SutOutput => {
  const getOriginalUrlByShortCodeRepositoryMock =
    new GetUrlByShortCodeRepositoryMock();
  const sut = new GetUrlByShortCodeService(
    getOriginalUrlByShortCodeRepositoryMock,
  );

  return {
    sut,
    getOriginalUrlByShortCodeRepositoryMock,
  };
};

describe('GetUrlByShortCodeService', () => {
  it('should call getOriginalUrlByShortCodeRepository.get once', async () => {
    const { sut, getOriginalUrlByShortCodeRepositoryMock } = makeSut();

    await sut.get('abc123');

    expect(getOriginalUrlByShortCodeRepositoryMock.count).toBe(1);
  });

  it('should throw if getOriginalUrlByShortCodeRepository.get returns null', async () => {
    const { sut, getOriginalUrlByShortCodeRepositoryMock } = makeSut();
    getOriginalUrlByShortCodeRepositoryMock.response = null;

    const promise = sut.get('abc123');

    await expect(promise).rejects.toThrow();
  });
});
