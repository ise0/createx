import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';

type CharacteristicValue = {
  characteristic_value_id: number;
  characteristic_type_id: number;
  characteristic_name: string;
  characteristic_value: string;
  characteristic_view: string;
};

type CartProduct = {
  product_id: number;
  product_characteristic_id: number;
  product_name: string;
  image_preview: string;
  characteristic_values: CharacteristicValue[];
  price: number;
  discount: number;
  quantity: number;
};

export async function getUserCart(userId: number) {
  try {
    const res = await db.query('select to_json(get_user_cart($1))', [userId]);
    return { data: res.rows[0]['to_json'] as CartProduct[] };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
