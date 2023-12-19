import { AuthorizationRequiredGuard } from '../../guards/authorization-required.guard';
import { ExecutionContextMock } from '../mocks/execution-context.mock';
import { ReflectorMock } from '../mocks/reflector.mock';

type SutOutput = {
  sut: AuthorizationRequiredGuard;
  reflector: ReflectorMock;
};

const makeSut = (): SutOutput => {
  const reflector = new ReflectorMock();
  const sut = new AuthorizationRequiredGuard(reflector);
  return { sut, reflector };
};

describe('AuthorizationRequiredGuard', () => {
  it('should return true if isAuthorizationRequired is false', () => {
    process.env.ENV = 'TEST';
    const { sut, reflector } = makeSut();
    reflector.response = false;

    const result = sut.canActivate(new ExecutionContextMock());
    expect(result).toBe(true);
  });

  it('should return true if isAuthorizationRequired is true and token is valid', () => {
    process.env.ENV = 'TEST';
    process.env.JWT_SECRET = 'secret';
    const { sut, reflector } = makeSut();
    reflector.response = true;

    const result = sut.canActivate(new ExecutionContextMock());
    expect(result).toBe(true);
  });

  it('should throw if token is undefined', () => {
    process.env.ENV = 'TEST';
    process.env.JWT_SECRET = 'secret';
    const { sut, reflector } = makeSut();
    reflector.response = true;
    const executionContext = new ExecutionContextMock();
    executionContext.requestType = 'No Header';

    expect(() => sut.canActivate(executionContext)).toThrow();
  });

  it('should throw if jsonwebtoken.verify throws', () => {
    process.env.ENV = 'TEST';
    process.env.JWT_SECRET = 'secret';
    const { sut, reflector } = makeSut();
    reflector.response = true;

    const executionContext = new ExecutionContextMock();
    executionContext.requestType = 'No Bearer';

    expect(() => sut.canActivate(executionContext)).toThrow();
  });

  it('should throw Bearer Token Expired if jsonwebtoken.verify throws TokenExpiredError', () => {
    process.env.ENV = 'TEST';
    process.env.JWT_SECRET = 'secret';
    const { sut, reflector } = makeSut();
    reflector.response = true;

    const executionContext = new ExecutionContextMock();
    executionContext.requestType = 'Bearer Expired';

    expect(() => sut.canActivate(executionContext)).toThrow(
      'Bearer token expired.',
    );
  });
});
