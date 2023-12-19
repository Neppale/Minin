/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext } from '@nestjs/common';
import { RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';

export class ExecutionContextMock implements ExecutionContext {
  countGetArgByIndex = 0;
  countGetType = 0;
  countClass = 0;
  countSwitchToHttp = 0;
  countGetHandler = 0;
  countGetArgs = 0;
  isPublic = false;
  type = 'rpc';
  hasMetadata = true;
  classResponse = {
    name: 'TestLoggingInterceptor',
  };
  requestType = 'Bearer';
  static requestType = 'No Header';
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJiaWFtIiwiZXhwIjo5OTk5OTk5OTk5LCJzdWIiOiJqb2UuZ29sZGJlcmdAYWxsb3MuY28iLCJpYXQiOjE2OTQ2MjgwNjF9.ii1E7weaVfTE6S7PFdJjv50tmuP0uTgCQ1UWGTMoy-c';

  getClass(): any {
    this.countClass++;
    return this.classResponse;
  }
  getHandler(): any {
    this.countGetHandler++;
    return this.isPublic;
  }
  getArgs(): any {
    this.countGetArgs++;
  }
  getArgByIndex(_index: number): any {
    this.countGetArgByIndex++;
    if (!this.hasMetadata) {
      return undefined;
    }
    const metadataMap = new Map<string, string[]>([
      ['authorization', [this.token]],
    ]);
    return {
      get: function (key: string) {
        return metadataMap.get(key.toLowerCase());
      },
      add: function (key: string, value: any) {
        return metadataMap.set(key.toLowerCase(), value);
      },
      toJSON: function () {
        return {
          user: [{ username: 'any_username' }],
        };
      },
      internalRepr: metadataMap,
      options: {},
    };
  }
  switchToRpc(): RpcArgumentsHost {
    throw new Error('Method not implemented.');
  }
  switchToHttp(): any {
    this.countSwitchToHttp++;

    const scenarios = {
      'No Header': { headers: {} },
      'No Bearer': { headers: { authorization: 'Bearer any_token' } },
      Bearer: {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJiaWFtIiwiZXhwIjo5OTk5OTk5OTk5LCJzdWIiOiJqb2UuZ29sZGJlcmdAYWxsb3MuY28iLCJpYXQiOjE2OTQ2MjgwNjF9.ii1E7weaVfTE6S7PFdJjv50tmuP0uTgCQ1UWGTMoy-c',
        },
      },
      'Bearer Expired': {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiJ0YWJsZXQtYmZmIiwiZXhwIjo5LCJzdWIiOiJhbGxvcy1wcm9tb3Rpb24iLCJpYXQiOjE2OTU4NTY3NTV9.OPfNLoQHzPK_LV-ZJqyi7oe7lY0emi4xlT1TCN2t6HU',
        },
      },
    };

    const scenario = scenarios[this.requestType] || scenarios['No Header'];

    return {
      getRequest: function () {
        return scenario;
      },
    };
  }

  switchToWs(): WsArgumentsHost {
    throw new Error('Method not implemented.');
  }
  getType(): any {
    this.countGetType++;
    return this.type;
  }
}
