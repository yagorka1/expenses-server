import { ErrorCode, ErrorTarget } from '../constans/errors';
import { ICustomError } from './customErrorInterface';

export class NotFoundError extends Error implements ICustomError {
  public readonly code: ErrorCode;

  public readonly target: string;

  public readonly message: string;

  public constructor(message?: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.message = message || 'Not found';
    this.code = ErrorCode.NOT_FOUND;
    this.target = ErrorTarget.COMMON;
  }
}
