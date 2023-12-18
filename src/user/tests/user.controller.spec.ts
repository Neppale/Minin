import { UserController } from '../user.controller';
import { AuthenticateUserServiceMock } from './mock/services/authenticate-user.service.mock';
import { CreateUserServiceMock } from './mock/services/create-user.service.mock';
import { DeactivateUserServiceMock } from './mock/services/deactivate-user.service.mock';

type SutOutput = {
  sut: UserController;
  deactivateUserServiceMock: DeactivateUserServiceMock;
  createUserServiceMock: CreateUserServiceMock;
  authenticateUserServiceMock: AuthenticateUserServiceMock;
};

function makeSut(): SutOutput {
  const deactivateUserServiceMock = new DeactivateUserServiceMock();
  const createUserServiceMock = new CreateUserServiceMock();
  const authenticateUserServiceMock = new AuthenticateUserServiceMock();
  const sut = new UserController(
    createUserServiceMock,
    deactivateUserServiceMock,
    authenticateUserServiceMock,
  );

  return {
    sut,
    deactivateUserServiceMock,
    createUserServiceMock,
    authenticateUserServiceMock,
  };
}

describe('UserController', () => {
  it('should call deactivateUserService.deactivate once', async () => {
    const { sut, deactivateUserServiceMock } = makeSut();
    await sut.deactivate({ id: 1 }, 'any_token');

    expect(deactivateUserServiceMock.count).toBe(1);
  });

  it('should call createUserService.create once', async () => {
    const { sut, createUserServiceMock } = makeSut();
    await sut.create({ email: 'any_email', password: 'any_password' });

    expect(createUserServiceMock.count).toBe(1);
  });

  it('should call authenticateUserService.authenticate once', async () => {
    const { sut, authenticateUserServiceMock } = makeSut();
    await sut.authenticate({
      email: 'any_email',
      password: 'any_password',
    });

    expect(authenticateUserServiceMock.count).toBe(1);
  });
});
