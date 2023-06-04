import { addUserCartItem as modelAddUserCartItem } from '@src/models/user-cart';
import { Request } from 'express';
import { ApiError401 } from '@src/shared/api-error';

type Params = { productId: number; productCharacteristicId?: number; quantity: number };

export function addUserCartItem(params: Params, req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelAddUserCartItem({ userId: req.user.user_id, ...params });
}
