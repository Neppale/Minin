import { CreateShortenedUrlService } from '../../services/create-shortened-url.service';
import { CheckAvailableShortenedUrlRepositoryMock } from '../mock/repository/check-available-shortened-url-repository.mock';
import { CreateShortenedUrlRepositoryMock } from '../mock/repository/create-shortened-url.repository.mock';

type SutOutput = {
  sut: CreateShortenedUrlService;
  checkAvailableShortenedUrlRepository: CheckAvailableShortenedUrlRepositoryMock;
  createShortenedUrlRepository: CreateShortenedUrlRepositoryMock;
};

const makeSut = (): SutOutput => {
  const checkAvailableShortenedUrlRepository =
    new CheckAvailableShortenedUrlRepositoryMock();
  const createShortenedUrlRepository = new CreateShortenedUrlRepositoryMock();
  const sut = new CreateShortenedUrlService(
    checkAvailableShortenedUrlRepository,
    createShortenedUrlRepository,
  );

  return {
    sut,
    checkAvailableShortenedUrlRepository,
    createShortenedUrlRepository,
  };
};

describe('CreateShortenedUrlService', () => {
  it('should call checkAvailableShortenedUrlRepository.check once', async () => {
    const { sut, checkAvailableShortenedUrlRepository } = makeSut();

    await sut.create('https://www.google.com');

    expect(checkAvailableShortenedUrlRepository.count).toBe(1);
  });

  it('should call createShortenedUrlRepository.create once', async () => {
    const { sut, createShortenedUrlRepository } = makeSut();

    await sut.create('https://www.google.com');

    expect(createShortenedUrlRepository.count).toBe(1);
  });
});
