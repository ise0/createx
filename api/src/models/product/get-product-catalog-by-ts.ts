import { ErrorCodes, OperationalError } from '@src/shared/operational-error';
import { camelToSnakeCase } from '@src/shared/camel-to-snakecase';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import type { ProductCatalog } from './types';

type Params = {
  filters: {
    tagFilters: { filterId: string; tags: string[] }[];
    priceFilter: { start: number; end: number };
  };
  sort?: number;
  textSearch: string;
  pagination: { offset: number; limit: number };
};

type ValidationError = {
  paginationLimit?: string;
};

function validateParams(params: Params) {
  const validationError: ValidationError = {};

  if (params.pagination.limit > 30) {
    validationError.paginationLimit = 'provide valid pagination limit';
  }

  if (Object.values(validationError).length > 0) return validationError;
}

export async function getProductCatalogByTS(params: Params) {
  const validationError = validateParams(params);
  if (validationError !== undefined) {
    return new OperationalError({ code: ErrorCodes.badInput, error: validationError });
  }
  const { textSearch, filters, sort, pagination } = params;
  try {
    const res = await db.query('select to_json(get_product_catalog_by_search_text($1,$2,$3,$4))', [
      JSON.stringify(camelToSnakeCase(filters)),
      sort,
      textSearch,
      pagination,
    ]);
    return { data: res.rows[0]['to_json'][0] as ProductCatalog };
  } catch (error) {
    logger.warn('db request fail');;
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
