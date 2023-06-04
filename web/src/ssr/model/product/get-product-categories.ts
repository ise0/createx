import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { db } from 'ssr/shared/db';
import { logger } from 'ssr/shared/logger';
import { ErrorCodes, OperationalError } from 'ssr/shared/operational-error';

type Categories = [{ categoryId: number; categoryName: string; childs: Categories }];

export async function getProductCategories(parent_id?: number) {
  const queryText = `
    select to_json(get_product_categories($1))
    `;
  try {
    const res = await db.query(queryText, [parent_id]);
    return { data: snakeToCamelCase(res.rows[0]['to_json']) as Categories };
  } catch (error) {
    logger.warn('db request fail');
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
