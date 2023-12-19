/* eslint-disable @typescript-eslint/no-unused-vars */
export class CacheManagerMock {
  countAdd = 0;
  countSet = 0;
  countGet = 0;
  countDel = 0;
  countWrap = 0;
  countReset = 0;

  add(_request: any): Promise<any> {
    this.countAdd++;
    return;
  }
  set(_key: string, _value: any): Promise<any> {
    this.countSet++;
    return;
  }
  get(_key: string): Promise<any> {
    this.countGet++;
    return;
  }
  del(_key: string): Promise<any> {
    this.countDel++;
    return;
  }
  wrap(_args: any): Promise<any> {
    this.countWrap++;
    return;
  }
  reset(): Promise<any> {
    this.countReset++;
    return;
  }
  store = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
    mset: jest.fn(),
    mget: jest.fn(),
    keys: jest.fn(),
    mdel: jest.fn(),
    ttl: jest.fn(),
  };
}
