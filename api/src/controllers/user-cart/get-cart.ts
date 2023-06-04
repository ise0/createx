import { getUserCart as modelGetUserCart } from '@src/models/user-cart';
import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

export function getUserCart(req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelGetUserCart(req.user.user_id);
}
