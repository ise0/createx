import { getUserCartFavIds as modelGetCartFavProducts } from '@src/models/user/get-user-cart-fav-ids';
import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

export function getUserCartFavIds(req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelGetCartFavProducts(req.user.user_id);
}
