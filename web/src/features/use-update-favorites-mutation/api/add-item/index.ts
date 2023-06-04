import { isAxiosError } from 'axios';
import { ApiErrorCode, getApiError500, graphqlApi, GraphqlError } from 'shared/api';
import { logError } from 'shared/lib/log-error';

const query = `
mutation AddUserFavoritesItem($productId: Int!, $productCharacteristicId: Int) {
  addUserFavoritesItem(productId: $productId, productCharacteristicId: $productCharacteristicId)
}
`;

type ServerResponse =
  | {
      data: { addUserFavoritesItem: boolean };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [GraphqlError<ApiErrorCode.internalServerError, undefined>];
    };

export async function addFavItem(item: { productId: number; productCharacteristicId?: number }) {
  try {
    const res = await graphqlApi<ServerResponse>({ data: { query, variables: item } });
    if (res.data.errors === undefined) {
      return { data: 'success' as const };
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
