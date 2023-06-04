import { isAxiosError } from 'axios';
import { getApiError500, graphqlApi } from 'shared/api';
import { snakeToCamelCase } from 'shared/lib/camel-to-snakecase';
import { logError } from 'shared/lib/log-error';
import { UserData, ServerResponse } from './types';

export type Form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export const query = `
mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String, $rememberMe: Boolean!) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, rememberMe: $rememberMe) {
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

export async function signUp(form: Form) {
  try {
    const res = await graphqlApi<ServerResponse>({
      data: { query, variables: form },
    });
    if (res.data.errors === undefined) {
      return {
        data: snakeToCamelCase(res.data.data.createUser) as UserData,
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
