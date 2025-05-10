import { ErrorCode } from '../constans/errors';

export class ApiError extends Error {
  public status: number;
  public errors;
  public code: string;

  constructor(status: number, message: string | undefined,code: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.code = code;
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, 'Пользователь не авторизован', ErrorCode.UNAUTHORIZED)
  }

  static BadRequest(message: string | undefined, errors = []): ApiError {
    return new ApiError(400, message,  ErrorCode.BAD_REQUEST, errors);
  }

  static EmailAlreadyExist(): ApiError {
    return new ApiError(400, 'Email has already exist',  ErrorCode.BAD_REQUEST);
  }
}
