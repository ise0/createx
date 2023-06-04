import { moveToCart as modelMoveToCart } from '@src/models/user-favorites';
import { Request } from 'express';
import { ApiError401 } from '@src/shared/api-error';

type Params = { productId: number; productCharacteristicId?: number };

export function moveToCart(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelMoveToCart({ userId: req.user.user_id, ...params });
}
