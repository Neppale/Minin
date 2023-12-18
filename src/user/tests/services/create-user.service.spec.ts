import { CreateUserService } from '../../services/create-user.service';
import { CreateUserRepositoryMock } from '../mock/repository/create-user.repository.mock';
import { LoadUserByEmailRepositoryMock } from '../mock/repository/load-user-by-email.repository.mock';

type SutOuput = {
  sut: CreateUserService;
  createUserRepositoryMock: CreateUserRepositoryMock;
  loadUserByEmailRepositoryMock: LoadUserByEmailRepositoryMock;
};

function makeSut(): SutOuput {
  const loadUserByEmailRepositoryMock = new LoadUserByEmailRepositoryMock();
  const createUserRepositoryMock = new CreateUserRepositoryMock();
  const sut = new CreateUserService(
    createUserRepositoryMock,
    loadUserByEmailRepositoryMock,
  );

  return {
    sut,
    createUserRepositoryMock,
    loadUserByEmailRepositoryMock,
  };
}

describe('CreateUserService', () => {
  it('should call loadUserByEmailRepository.load once', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response = null;
    await sut.create({
      email: 'any_email',
      password: 'any_password',
    });

    expect(loadUserByEmailRepositoryMock.count).toBe(1);
  });

  it('should throw if existingUser is not undefined', async () => {
    const { sut } = makeSut();
    await expect(
      sut.create({
        email: 'any_email',
        password: 'any_password',
      }),
    ).rejects.toThrow();
  });

  it('should call createUserRepository.create once', async () => {
    const { sut, createUserRepositoryMock, loadUserByEmailRepositoryMock } =
      makeSut();
    loadUserByEmailRepositoryMock.response = null;
    await sut.create({
      email: 'any_email',
      password: 'any_password',
    });

    expect(createUserRepositoryMock.count).toBe(1);
  });

  it('should return a user', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut();
    loadUserByEmailRepositoryMock.response = null;
    const user = await sut.create({
      email: 'any_email',
      password: 'any_password',
    });

    expect(user).toBeTruthy();
  });
});
