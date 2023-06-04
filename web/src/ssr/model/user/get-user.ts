import { ErrorCodes, OperationalError } from 'ssr/shared/operational-error';
import { db } from 'ssr/shared/db';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { User } from './types';
import { logger } from 'ssr/shared/logger';

export async function getUser(userId: number) {
  try {
    const res = await db.query('select to_json(get_user_by_id($1))', [userId]);
    return {
      data: snakeToCamelCase(res.rows[0]['to_json']) as User,
    };
  } catch (error) {
    logger.warn('db request fail');
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
