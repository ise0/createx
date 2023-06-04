export enum ErrorCodes {
  internalError,
  forbidden,
}

export class OperationalError<T extends ErrorCodes, S> {
  code: T;
  error: S;
  message?: string;

  constructor({ message, code, error }: { message?: string; code: T; error: S }) {
    this.message = message;
    this.code = code;
    this.error = error;
  }
}

export function isOperationalError<T extends ErrorCodes, S>(
  error: unknown
): error is OperationalError<T, S> {
  return error instanceof OperationalError;
}