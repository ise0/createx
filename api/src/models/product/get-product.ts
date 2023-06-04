import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import type { Product } from './types';

export async function getProduct(productId: number) {
  try {
    const res = await db.query(
      'select to_json(get_products(array[($1,1)]::c_product_id_variant_id[]))',
      [productId]
    );
    return { data: res.rows[0]['to_json'][0] as Product };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
