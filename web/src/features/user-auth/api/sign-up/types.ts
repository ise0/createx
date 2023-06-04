import { ApiErrorCode, GraphqlError } from 'shared/api';

export type ServerResponse =
  | {
      data: {
        createUser: {
          user: {
            user_id: number;
            first_name: string;
            last_name: string;
            email: string;
          };
        };
      };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [
        | GraphqlError<
            ApiErrorCode.badRequest,
            {
              firstName?: string;
              lastName?: string;
              email?: string;
              password?: string;
            }
          >
        | GraphqlError<ApiErrorCode.internalServerError, undefined>
      ];
    };

export type UserData = {
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
};
