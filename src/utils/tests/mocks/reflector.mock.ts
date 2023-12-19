/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reflector } from '@nestjs/core';

export class ReflectorMock extends Reflector {
  response = false;
  countGet = 0;
  get(_metadataKey: any, _target: any): any {
    this.countGet++;
    return this.response;
  }
}
