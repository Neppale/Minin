import { RedisService } from '../services/redis.service';
import { CacheManagerMock } from './mock/cache-manager.mock';

type SutOutput = {
  sut: RedisService;
  cacheManager: CacheManagerMock;
};

const makeSut = (): SutOutput => {
  const cacheManager = new CacheManagerMock();
  const sut = new RedisService(cacheManager);
  return {
    sut,
    cacheManager,
  };
};

describe('RedisService', () => {
  it('should call cacheManager.del once', () => {
    const { sut, cacheManager } = makeSut();
    sut.del('any_key');
    expect(cacheManager.countDel).toBe(1);
  });
  it('should call cacheManager.get once', () => {
    const { sut, cacheManager } = makeSut();
    sut.get('any_key');
    expect(cacheManager.countGet).toBe(1);
  });
  it('should call cacheManager.set once', () => {
    const { sut, cacheManager } = makeSut();
    sut.set({ key: 'any_key', value: 'any_value' });
    expect(cacheManager.countSet).toBe(1);
  });
});
