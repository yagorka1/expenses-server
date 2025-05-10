import { ErrorCode } from '../constans/errors';

interface ICustomError {
  readonly code: ErrorCode;
  readonly target: string;
  readonly message?: string;
  readonly source?: object;
}


export { ICustomError };
