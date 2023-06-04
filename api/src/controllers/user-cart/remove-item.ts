import { removeUserCartItem as modelRemoveUserCartItem } from '@src/models/user-cart';
import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

type Params = { productId: number; productCharacteristicId?: number };

export function removeUserCartItem(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelRemoveUserCartItem({ userId: req.user.user_id, ...params });
}
