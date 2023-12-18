import { DeactivateUserService } from '../../services/deactivate-user.service';
import { DeactivateUserRepositoryMock } from '../mock/repository/deactivate-user.repository.mock';
import { LoadUserByIdRepositoryMock } from '../mock/repository/load-user-by-id.repository.mock';

type SutOutput = {
  sut: DeactivateUserService;
  loadUserByIdRepositoryMock: LoadUserByIdRepositoryMock;
  deactivateUserRepositoryMock: DeactivateUserRepositoryMock;
};

function makeSut(): SutOutput {
  const loadUserByIdRepositoryMock = new LoadUserByIdRepositoryMock();
  const deactivateUserRepositoryMock = new DeactivateUserRepositoryMock();
  const sut = new DeactivateUserService(
    loadUserByIdRepositoryMock,
    deactivateUserRepositoryMock,
  );

  return {
    sut,
    loadUserByIdRepositoryMock,
    deactivateUserRepositoryMock,
  };
}

describe('DeactivateUserService', () => {
  it('should call loadUserByIdRepository.load once', async () => {
    const { sut, loadUserByIdRepositoryMock } = makeSut();
    await sut.deactivate(1);

    expect(loadUserByIdRepositoryMock.count).toBe(1);
  });

  it('should throw if user is null', async () => {
    const { sut, loadUserByIdRepositoryMock } = makeSut();
    loadUserByIdRepositoryMock.response = null;

    await expect(sut.deactivate(1)).rejects.toThrow();
  });

  it('should call deactivateUserRepository.deactivate once', async () => {
    const { sut, deactivateUserRepositoryMock } = makeSut();
    await sut.deactivate(1);

    expect(deactivateUserRepositoryMock.count).toBe(1);
  });
});
