import { ApiErrorCode, GraphqlError } from 'shared/api';

export type ServerResponse =
  | {
      data: {
        user: {
          user_id: number;
          first_name: string;
          last_name: string;
          email: string;
        };
      };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [
        | GraphqlError<ApiErrorCode.notValidAuth, undefined>
        | GraphqlError<ApiErrorCode.internalServerError, undefined>
      ];
    };

export type ClientResponse =
  | {
      data: {
        user: {
          userId: number;
          firstName: string;
          lastName: string;
          email: string;
        };
      };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [
        | GraphqlError<ApiErrorCode.notValidAuth, undefined>
        | GraphqlError<ApiErrorCode.internalServerError, undefined>
      ];
    };
