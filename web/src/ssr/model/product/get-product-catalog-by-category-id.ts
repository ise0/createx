import { ErrorCodes, OperationalError } from 'ssr/shared/operational-error';
import { camelToSnakeCase } from 'ssr/shared/camel-to-snakecase';
import { db } from 'ssr/shared/db';
import type { ProductCatalog } from './types';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logger } from 'ssr/shared/logger';

type Params = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter?: { start: number; end: number };
  };
  sort: number;
  categoryId: number;
  pagination: { offset: number; limit: number };
};

export async function getProductCatalogByCategoryId(params: Params) {
  const { categoryId, filters, sort, pagination } = params;
  if (pagination.limit > 30) pagination.limit = 30;

  try {
    const res = await db.query('select to_json(get_product_catalog_by_category_id($1,$2,$3,$4))', [
      JSON.stringify(camelToSnakeCase(filters)),
      sort,
      categoryId,
      pagination,
    ]);
    return { data: snakeToCamelCase(res.rows[0]['to_json'][0]) as ProductCatalog };
  } catch (error) {
    logger.warn('db request fail');
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
