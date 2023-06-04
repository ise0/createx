import { moveToFav as modelMoveToFav } from '@src/models/user-cart';
import { Request } from 'express';
import { ApiError401 } from '@src/shared/api-error';

type Params = { productId: number; productCharacteristicId?: number };

export function moveToFav(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelMoveToFav({ userId: req.user.user_id, ...params });
}
