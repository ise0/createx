import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { CartProduct, ServerResponse } from './types';

const queryText = `
query UserCart {
    userCart {
      product_id
      product_characteristic_id
      product_name
      image_preview
      characteristic_values {
        characteristic_type_id
        characteristic_name
        characteristic_value
        characteristic_view
      }
      price
      price_with_discount
      discount
      quantity
    }
  }
`;

export async function getUserCart() {
  try {
    const res = await graphqlApi<ServerResponse>({ data: { query: queryText } });
    if (res.data.errors === undefined) {
      return { data: snakeToCamelCase(res.data.data.userCart) as CartProduct[] };
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
