import axios from 'axios';

const isServer = typeof window === 'undefined';

export enum ApiErrorCode {
  internalServerError = 'INTERNAL_SERVER_ERROR',
  badRequest = 'BAD_REQUEST',
  notValidAuth = 'NOT_VALID_AUTH',
  forbidden = 'FORBIDDEN',
  notFound = 'NOT_FOUND',
}

export type GraphqlError<T extends ApiErrorCode, S> = {
  extensions: { message: string; code: T; error: S };
};

export function getApiError500() {
  return {
    code: ApiErrorCode.internalServerError as const,
    message: 'internal server error',
    error: undefined,
  };
}

export const graphqlApi = axios.create({
  baseURL: '/api/graphql',
  method: 'post',
  withCredentials: true,
});

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

if (isServer === false) {
  const authToken = getCookie('auth_jwt');

  if (authToken !== undefined) {
    graphqlApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
}
