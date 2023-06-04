import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';

type Params = { userId: number; productId: number; productCharacteristicId?: number };

export async function removeUserWishListItem({
  userId,
  productId,
  productCharacteristicId,
}: Params) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const queryText = `
      delete from user_favorites where user_id = $1 and product_id = $2 and product_characteristic_id = $3
    `;
    await client.query(queryText, [userId, productId, productCharacteristicId]);

    await client.query('COMMIT');
    return { data: 'success' };
  } catch (error) {
    logger.warn('db request fail');;
    await client.query('ROLLBACK').catch(() => {});
    return {
      error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }),
    };
  } finally {
    client.release();
  }
}
