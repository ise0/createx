import { Response } from 'express';

export function logout(res: Response) {
  res.clearCookie('auth_jwt', { httpOnly: true });
}
