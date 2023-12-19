import { AuthorizationAwareCacheInterceptor } from '../../interceptors/authorization-aware-cache.interceptor';
import { ExecutionContextMock } from '../mocks/execution-context.mock';
import { ReflectorMock } from '../mocks/reflector.mock';
import { CacheManagerMock } from '../../../redis/tests/mock/cache-manager.mock';

type SutOutput = {
  sut: AuthorizationAwareCacheInterceptor;
  reflectorMock: ReflectorMock;
  cacheManagerMock: CacheManagerMock;
};

const makeSut = (): SutOutput => {
  const reflectorMock = new ReflectorMock();
  const cacheManagerMock = new CacheManagerMock();
  const sut = new AuthorizationAwareCacheInterceptor(
    cacheManagerMock,
    reflectorMock,
  );

  return {
    sut,
    reflectorMock,
    cacheManagerMock,
  };
};

describe('AuthorizationAwareCacheInterceptor', () => {
  it('should return undefined for non-GET requests', () => {
    const { sut } = makeSut();
    const context = new ExecutionContextMock();
    context.switchToHttp().getRequest().method = 'POST';

    const response = sut.trackBy(context);

    expect(response).toBeUndefined();
  });

  it('should return undefined if no bearer token is found', () => {
    const { sut } = makeSut();
    const context = new ExecutionContextMock();
    context.switchToHttp().getRequest().method = 'GET';
    context.switchToHttp().getRequest().rawHeaders = [
      'Content-Type: application/json',
    ];

    const result = sut.trackBy(context);

    expect(result).toBeUndefined();
  });
});
