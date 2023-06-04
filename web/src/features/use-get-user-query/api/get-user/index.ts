import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { ServerResponse, ClientResponse } from './types';

const queryText = `
query User {
  user {
    user_id
    first_name
    last_name
    email
  }
}
`;

export async function getUser() {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query: queryText },
    });
    const clientRes = snakeToCamelCase(res) as ClientResponse;
    if (clientRes.errors === undefined) return { data: clientRes.data.user };

    return { error: clientRes.errors[0].extensions };
  } catch (error) {
    if (isAxiosError(error)) {
      logError(error);
      return { error: getApiError500() };
    }
    throw error;
  }
}
