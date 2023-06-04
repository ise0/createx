import type { ApolloServerOptions } from '@apollo/server';
import { unwrapResolverError } from '@apollo/server/errors';
import { ApiError, ApiError400, ApiError403, ApiError500, isApiError } from '@src/shared/api-error';
import { ErrorCodes, isOperationalError } from '@src/shared/operational-error';
import { GraphQLError } from 'graphql';

export const formatError: ApolloServerOptions<{}>['formatError'] = (formattedError, error) => {
  if (!(error instanceof GraphQLError)) throw error;

  const unwrapedError = unwrapResolverError(error);

  let apiError: ApiError | undefined = undefined;
  let err: unknown | undefined = unwrapedError;
  if (
    typeof unwrapedError === 'object' &&
    unwrapedError !== null &&
    'thrownValue' in unwrapedError
  ) {
    err = unwrapedError.thrownValue;
  }

  if (isApiError(err)) {
    apiError = err;
  } else if (isOperationalError(err)) {
    if (err.code === ErrorCodes.badInput) {
      apiError = new ApiError400({ error: err.error });
    } else if (err.code === ErrorCodes.forbidden) {
      apiError = new ApiError403({ error: err.error });
    }
  } else {
    throw error;
  }

  if (apiError === undefined) apiError = new ApiError500({});

  return new GraphQLError('custom error', {
    path: error.path,
    positions: error.positions,
    source: error.source,
    extensions: {
      message: apiError.message,
      code: apiError.code,
      error: apiError.error,
    },
  });
};
