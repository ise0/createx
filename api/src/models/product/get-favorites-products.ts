import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { camelToSnakeCase } from '@src/shared/camel-to-snakecase';
import { logger } from '@src/shared/logger';

type CharacteristicValue = {
  characteristic_value_id: number;
  characteristic_type_id: number;
  characteristic_name: string;
  characteristic_value: string;
  characteristic_view: string;
};

type FavoritesProduct = {
  product_id: number;
  product_characteristic_id: number;
  product_name: string;
  image_preview: string;
  characteristic_values: CharacteristicValue[];
  price: number;
  price_with_discount: number;
  discount: number;
};

type ProductParam = {
  productId: number;
  productCharacteristicId?: number;
};

export async function getFavoritesProducts(products: ProductParam[]) {
  try {
    const res = await db.query('select to_json(get_favorites_products($1))', [
      JSON.stringify(camelToSnakeCase(products)),
    ]);
    return { data: res.rows[0]['to_json'] as FavoritesProduct };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
