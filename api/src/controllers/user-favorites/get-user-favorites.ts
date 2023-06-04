import { getUserFavorites as modelGetUserFavorites } from '@src/models/user-favorites';
import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

export function getUserFavorites(req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return modelGetUserFavorites(req.user.user_id);
}
