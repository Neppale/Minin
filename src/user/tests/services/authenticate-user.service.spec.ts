import { hashSync } from 'bcrypt';
import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { LoadUserByEmailRepositoryMock } from '../mock/repository/load-user-by-email.repository.mock';

type SutOuput = {
  sut: AuthenticateUserService;
  loadUserByEmailRepositoryMock: LoadUserByEmailRepositoryMock;
};

function makeSut(): SutOuput {
  const loadUserByEmailRepositoryMock = new LoadUserByEmailRepositoryMock();
  const sut = new AuthenticateUserService(loadUserByEmailRepositoryMock);

  return {
    sut,
    loadUserByEmailRepositoryMock,
  };
}

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'any_secret';
  });
  it('should call loadUserByEmailRepository.load once', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response.password = hashSync(
      'any_password',
      12,
    );
    await sut.authenticate({
      email: 'any_email',
      password: 'any_password',
    });

    expect(loadUserByEmailRepositoryMock.count).toBe(1);
  });

  it('should throw if user is null', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response = null;

    await expect(
      sut.authenticate({
        email: 'any_email',
        password: 'any_password',
      }),
    ).rejects.toThrow();
  });

  it('should throw if isPasswordValid is false', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response.password = 'wrong_password';

    await expect(
      sut.authenticate({
        email: 'any_email',
        password: 'any_password',
      }),
    ).rejects.toThrow();
  });

  it('should return a token', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response.password = hashSync(
      'any_password',
      12,
    );
    const token = await sut.authenticate({
      email: 'any_email',
      password: 'any_password',
    });

    expect(token).toBeTruthy();
  });
});
