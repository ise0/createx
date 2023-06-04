import validator from 'validator';
import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import { User } from './types';

type ValidationError = {
  email?: string;
};

function validateParams(email: string) {
  const validationError: ValidationError = {};

  if (!validator.isEmail(email)) validationError.email = 'provide valid email';

  if (Object.values(validationError).length > 0) return validationError;
}

export async function getUserByEmail(email: string) {
  const validationError = validateParams(email);

  if (validationError !== undefined) {
    return { error: new OperationalError({ code: ErrorCodes.badInput, error: validationError }) };
  }
  try {
    const res = await db.query('select to_json(get_user_by_email($1))', [email]);
    return { data: res.rows[0]['to_json'] as User | null };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
