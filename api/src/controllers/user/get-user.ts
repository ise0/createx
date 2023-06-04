import { ApiError401 } from '@src/shared/api-error';
import { Request } from 'express';

export function getUser(req: Request) {
  if (req.user === undefined) {
    return { error: new ApiError401({}) };
  }
  return { data: req.user };
}
