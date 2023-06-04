import { addFavoritesItem as modelAddFavoritesItem } from '@src/models/user-favorites';
import { Request } from 'express';
import { ApiError401 } from '@src/shared/api-error';

type Params = { productId: number; productCharacteristicId?: number };

export async function addUserFavoritesItem(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelAddFavoritesItem({ userId: req.user.user_id, ...params });
}
