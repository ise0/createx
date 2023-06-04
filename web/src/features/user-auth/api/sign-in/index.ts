import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { ServerResponse, UserData } from './types';

export type Form = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const query = `
mutation UserLogin($email: String!, $password: String!, $rememberMe: Boolean!) {
  userLogin(email: $email, password: $password, rememberMe: $rememberMe) {
    user {
      user_id
      first_name
      last_name
      email
    }
    token
  }
}
`;

export async function signIn(form: Form) {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query, variables: form },
    });

    if (res.data.errors === undefined) {
      return {
        data: snakeToCamelCase(res.data.data.userLogin) as UserData,
      };
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
