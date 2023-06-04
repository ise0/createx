import { ErrorCodes, OperationalError, tryFail } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';

type Params = { userId: number; productId: number; productCharacteristicId?: number };

export async function addFavoritesItem({ userId, productId, productCharacteristicId }: Params) {
  const { data: client, error } = await tryFail(() => db.connect());
  if (error !== undefined) return { error };

  try {
    await client.query('BEGIN');

    let queryText = `
      insert into user_favorites(user_id, product_id, product_characteristic_id) 
      select $1, $2, $3
      where ${productCharacteristicId === undefined ? 'not' : ''} exists( 
        select product_id 
        from product_characteristics 
        where product_id = $2 and product_characteristic_id = $3
      )
      on conflict (user_id, product_id, product_characteristic_id ) do nothing;
    `;
    await client.query(queryText, [userId, productId, productCharacteristicId]);

    await client.query('COMMIT');

    return { data: 'success' };
  } catch (error) {
    logger.warn('db request fail');
    await client.query('ROLLBACK').catch(() => {});
    return {
      error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }),
    };
  } finally {
    client.release();
  }
}
