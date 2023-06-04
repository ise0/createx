import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { queryText } from './query';
import { ProductCatalog, ServerResponse } from './types';

type SearchParams = {
  textSearch: string;
  filters: {
    tagFilters: {
      filterId: string;
      tags: string[];
    }[];
    priceFilter?: { start: number; end: number };
  };
  sort: number;
  pagination: { limit: number; offset: number };
};

export async function getProductCatalogByTS(searchParams: SearchParams) {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query: queryText, variables: searchParams },
    });
    if (res.data.errors === undefined) {
      return { data: snakeToCamelCase(res.data.data.productCatalogByTS) as ProductCatalog };
    }
    return { error: res.data.errors[0].extensions };
  } catch (error) {
    if (isAxiosError(error)) {
      logError(error);
      return { error: getApiError500() };
    }
    throw error;
  }
}
