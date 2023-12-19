import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { AUTHORIZATION_REQUIRED_KEY } from '../authorization-required.decorator';

@Injectable()
export class AuthorizationRequiredGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAuthorizationRequired = this.reflector.get<boolean>(
      AUTHORIZATION_REQUIRED_KEY,
      context.getHandler(),
    );

    if (isAuthorizationRequired) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split('Bearer ')[1];

      if (!token) {
        throw new UnauthorizedException({
          message: 'Missing Bearer token.',
        });
      }

      try {
        verify(token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new UnauthorizedException({
            message: 'Bearer token expired.',
          });
        }

        throw new UnauthorizedException({
          message: 'Invalid Bearer token.',
        });
      }
    }

    return true;
  }
}
