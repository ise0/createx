import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import { ErrorCodes, OperationalError } from '@src/shared/operational-error';

type Categories = [{ category_id: number; category_name: string; childs: Categories }];

export async function getProductCategories(parent_id?: number) {
  const queryText = `
    select to_json(get_product_categories($1))
    `;
  try {
    const res = await db.query(queryText, [parent_id]);
    return { data: res.rows[0]['to_json'] as Categories };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
