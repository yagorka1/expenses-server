import { ErrorCode, ErrorTarget } from '../constans/errors';
import { ICustomError } from './customErrorInterface';

export class AuthorizationFailedError extends Error implements ICustomError {
  public readonly code: ErrorCode;

  public readonly target: string;

  public readonly message: string;

  public constructor(message?: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AuthorizationFailedError.prototype);

    this.message = message || 'Authorization Failed Error';
    this.code = ErrorCode.UNAUTHORIZED;
    this.target = ErrorTarget.COMMON;
  }
}
