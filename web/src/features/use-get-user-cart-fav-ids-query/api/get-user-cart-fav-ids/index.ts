import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { UserCartFavIds, ServerResponse } from './types';

const queryText = `
query UserCartFavIds {
  userCartFavIds {
    cart {
      product_id
      product_characteristic_id
    }
    fav {
      product_id
      product_characteristic_id
    }
  }
}
`;

export async function getUserCartFavIds() {
  try {
    const res = await graphqlApi<ServerResponse>({ data: { query: queryText } });
    if (res.data.errors === undefined) {
      return { data: snakeToCamelCase(res.data.data.userCartFavIds) as UserCartFavIds };
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
