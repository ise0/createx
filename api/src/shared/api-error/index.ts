const ErrorCodes = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_VALID_AUTH: 'NOT_VALID_AUTH',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
};

export class ApiError {
  message: string;
  code: string;
  error?: unknown;

  constructor({ message, error, code }: { message: string; code: string; error?: unknown }) {
    this.message = message;
    this.code = code;
    this.error = error;
  }
}

export class ApiError500 extends ApiError {
  constructor({ error, message }: { error?: unknown; message?: string }) {
    super({
      error,
      message: message || 'Internal server error',
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export class ApiError400 extends ApiError {
  constructor({ error, message }: { error?: unknown; message?: string }) {
    super({ error, message: message || 'Bad Request', code: ErrorCodes.BAD_REQUEST });
  }
}

export class ApiError401 extends ApiError {
  constructor({ error, message }: { error?: unknown; message?: string }) {
    super({
      error,
      message: message || 'Not valid authentication credentials',
      code: ErrorCodes.NOT_VALID_AUTH,
    });
  }
}

export class ApiError403 extends ApiError {
  constructor({ error, message }: { error?: unknown; message?: string }) {
    super({ error, message: message || 'Forbidden', code: ErrorCodes.FORBIDDEN });
  }
}

export class ApiError404 extends ApiError {
  constructor({ error, message }: { error?: unknown; message?: string }) {
    super({ error, message: message || 'Not Found', code: ErrorCodes.NOT_FOUND });
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

