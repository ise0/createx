import { ApiErrorCode, GraphqlError } from 'shared/api';

export type ServerResponse =
  | {
      data: {
        logout: boolean;
      };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [GraphqlError<ApiErrorCode.internalServerError, undefined>];
    };
