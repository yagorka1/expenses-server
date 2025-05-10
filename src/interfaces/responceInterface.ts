import { ErrorCode, ErrorTarget } from '../constans/errors';

export interface ICommonError {
  code: ErrorCode;
  target: ErrorTarget.COMMON;
  message: string;
}

export interface IFieldError {
  code: ErrorCode;
  target: ErrorTarget.FIELD;
  message: string;
  source: {
    field: string;
    [key: string]: any;
  };
}

export type IError = ICommonError | IFieldError;

export interface IErrorResponse {
  errors: IError[];
}

export interface ISuccessResponse {
  data: any;
}

export interface IResponce {
  statusCode: number;
  headers?: object;
  body?: IErrorResponse | ISuccessResponse;
}
