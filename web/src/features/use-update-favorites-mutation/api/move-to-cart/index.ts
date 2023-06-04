import { isAxiosError } from 'axios';
import { ApiErrorCode, getApiError500, graphqlApi, GraphqlError } from 'shared/api';
import { logError } from 'shared/lib/log-error';

const query = `
mutation MoveToCart($productId: Int!, $productCharacteristicId: Int) {
  moveToCart(productId: $productId, productCharacteristicId: $productCharacteristicId)
}
`;

type ServerResponse =
  | {
      data: { moveToCart: boolean };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [
        | GraphqlError<ApiErrorCode.notValidAuth, undefined>
        | GraphqlError<ApiErrorCode.internalServerError, undefined>
      ];
    };

export async function moveToCart(item: { productId: number; productCharacteristicId?: number }) {
  try {
    const res = await graphqlApi<ServerResponse>({ data: { query, variables: item } });
    if (res.data.errors === undefined) {
      return { data: 'success' };
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
