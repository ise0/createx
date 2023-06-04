import { ErrorCodes, OperationalError, tryFail } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';

type CartItem = {
  userId: number;
  productId: number;
  productCharacteristicId?: number;
  quantity: number;
};

type CartItemErrors = {
  quantity?: string;
};

function validateCartItem(cartItem: CartItem) {
  const errors: CartItemErrors = {};

  if (cartItem.quantity < 1) {
    errors.quantity = 'provide valid quantity';
  }
  if (Object.values(errors).length > 0) return errors;
  return undefined;
}

export async function addUserCartItem(cartItem: CartItem) {
  const validationError = validateCartItem(cartItem);
  if (validationError !== undefined) {
    return new OperationalError({ code: ErrorCodes.badInput, error: validationError });
  }
  const { userId, productId, productCharacteristicId, quantity } = cartItem;

  const { data: client, error } = await tryFail(() => db.connect());
  if (error !== undefined) return { error };

  try {
    await client.query('BEGIN');

    let queryText = `
      insert into user_cart(user_id, product_id, product_characteristic_id, quantity) 
      select $1, $2, $3, $4
      where ${productCharacteristicId === undefined ? 'not' : ''} exists( 
        select product_id 
        from product_characteristics 
        where product_id = $2 and product_characteristic_id = $3
      )
      on conflict (user_id, product_id, product_characteristic_id ) do 
      update set quantity = $4;
    `;
    await client.query(queryText, [userId, productId, productCharacteristicId, quantity]);

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
