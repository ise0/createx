import { logger } from '../logger';

export enum ErrorCodes {
  internalError,
  badInput,
  forbidden,
}

export class OperationalError<T extends ErrorCodes, S> {
  code: T;
  error: S;

  constructor({  code, error }: { code: T; error: S }) {
    this.code = code;
    this.error = error;
  }
}

export function isOperationalError<T extends ErrorCodes, S>(
  error: unknown
): error is OperationalError<T, S> {
  return error instanceof OperationalError;
}

export async function tryFail<T>(fn: () => Promise<T>) {
  try {
    return { data: await fn() };
  } catch (error) {
    logger.warn(error);
    return {
      error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }),
    };
  }
}
