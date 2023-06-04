import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { Categories, ServerResponse } from './types';

const queryText = `
query ProductCategories {
  productCategories {
    category_id
    category_name
    childs
  }
}
`;

export async function getProductCategories() {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query: queryText },
    });
    if (res.data.errors === undefined) {
      return { data: snakeToCamelCase(res.data.data.productCategories) as Categories };
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
