const enum ErrorCode {
  UNAUTHORIZED = 'unauthorized',
  BAD_REQUEST = 'bad_request',
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  NOT_FOUND = 'not_found',
}

const enum ErrorTarget {
  COMMON = 'common',
  FIELD = 'field',
}

export { ErrorCode, ErrorTarget };
