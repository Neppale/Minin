import { SetMetadata } from '@nestjs/common';

export const AUTHORIZATION_REQUIRED_KEY = 'authorization-required';
/**
 * Decorator to mark a route as requiring authorization to be accessed.
 *
 */
export const AuthorizationRequired = () =>
  SetMetadata(AUTHORIZATION_REQUIRED_KEY, true);
