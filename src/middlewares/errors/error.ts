import { ErrorRequestHandler } from 'express';
import { ErrorCode, ErrorTarget } from '../../constans/errors';

export const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    if (err && err.status) {
      res.status(err.status).json({
        code: err.code,
        message: err.message,
        errors: err.errors,
      });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  } catch (error) {
    res.status(500).json({
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
