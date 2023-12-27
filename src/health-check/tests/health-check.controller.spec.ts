import { HealthCheckController } from '../health-check.controller';

type SutOutput = {
  sut: HealthCheckController;
};

const makeSut = (): SutOutput => {
  const sut = new HealthCheckController();
  return {
    sut,
  };
};

describe('HealthCheckController', () => {
  it('should return a string', () => {
    const { sut } = makeSut();
    const result = sut.healthCheck();
    expect(typeof result).toBe('string');
  });
});
