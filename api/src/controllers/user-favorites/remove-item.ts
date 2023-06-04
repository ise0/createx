import { removeUserWishListItem as modelRemoveUserWishListItem } from '@src/models/user-favorites';
import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

type Params = { productId: number; productCharacteristicId?: number };

export function removeUserFavoritesItem(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelRemoveUserWishListItem({ userId: req.user.user_id, ...params });
}
