import { ErrorCodes, OperationalError } from 'ssr/shared/operational-error';
import { db } from 'ssr/shared/db';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logger } from 'ssr/shared/logger';

type ItemId = { productId: number; productCharacteristicId?: number };

export async function getUserCartFavIds(userId: number) {
  try {
    const res = await db.query('select to_json(get_user_cart_fav_ids($1))', [userId]);
    return {
      data: snakeToCamelCase(res.rows[0]['to_json']) as {
        cart: ItemId[];
        fav: ItemId[];
      },
    };
  } catch (error) {
    logger.warn('db request fail');
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
