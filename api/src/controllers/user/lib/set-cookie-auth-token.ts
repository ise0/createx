import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { logger } from '@src/shared/logger';

export async function setCookieAuthToken(userId: unknown, res: Response, rememberMe: boolean) {
  try {
    const token = await new Promise<string | undefined>((resolve) => {
      jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (error, token) => {
          if (error) throw error;
          resolve(token);
        }
      );
    });
    if (token === undefined) {
      return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
    }
    res.cookie('auth_jwt', token, {
      expires:
        rememberMe === true
          ? new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000)
          : undefined,
    });
    return { data: token };
  } catch (error) {
    logger.error(error);
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
