import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import { User } from './types';

export async function getUserById(userId: number) {
  try {
    const res = await db.query('select to_json(get_user_by_id($1))', [userId]);
    return { data: res.rows[0]['to_json'] as User };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
