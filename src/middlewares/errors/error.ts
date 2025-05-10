import { NextFunction, Request, Response } from 'express';
import { ErrorCode, ErrorTarget } from '../../constans/errors';
import { HttpCode } from '../../errors/httpCode';
import { ApiError } from '../../exceptions/api-error';

export const errorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err && err.status) {
      return res.status(err.status).json({ code: err.code, message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: 'Server Error'});

  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      errors: [
        {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
          target: ErrorTarget.COMMON,
          message: 'INTERNAL_SERVER_ERROR',
        },
      ],
    });
  }
};
