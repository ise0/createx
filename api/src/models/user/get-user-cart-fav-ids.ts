import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';

type ItemId = {
  product_id: number;
  product_characteristic_id: number;
};

type UserCartFavIds = {
  cart: ItemId[];
  fav: ItemId[];
};

export async function getUserCartFavIds(userId: number) {
  try {
    const res = await db.query('select to_json(get_user_cart_fav_ids($1))', [userId]);
    return { data: res.rows[0]['to_json'] as UserCartFavIds[] };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
