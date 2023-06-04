import { ApiErrorCode, GraphqlError } from 'shared/api';

type UserCartFavIdResponse = {
  product_id: number;
  product_characteristic_id: number;
};

type UserCartFavIdsResponse = {
  cart: UserCartFavIdResponse[];
  fav: UserCartFavIdResponse[];
};

export type ServerResponse =
  | {
      data: { userCartFavIds: UserCartFavIdsResponse[] };
      errors: undefined;
    }
  | {
      data: undefined;
      errors: [
        | GraphqlError<ApiErrorCode.notValidAuth, undefined>
        | GraphqlError<ApiErrorCode.internalServerError, undefined>
      ];
    };

type UserCartFavId = {
  productId: number;
  productCharacteristicId: number;
};

export type UserCartFavIds = {
  cart: UserCartFavId[];
  fav: UserCartFavId[];
};
