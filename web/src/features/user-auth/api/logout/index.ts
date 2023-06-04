import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { logError } from 'shared/lib/log-error';
import { ServerResponse } from './types';

const query = `
mutation Mutation {
  userLogout
}
`;

export async function logout() {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query },
    });
    if (res.data.errors === undefined) return { data: true };

    return { error: res.data.errors[0].extensions };
  } catch (error) {
    if (isAxiosError(error)) {
      logError(error);
      return { error: getApiError500() };
    }
    throw error;
  }
}
