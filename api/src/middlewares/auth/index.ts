import { getUserById } from '@src/models/user';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response) {
  const headerToken = req.headers.authorization;
  if (headerToken === undefined) return;

  const token = headerToken.replace('Bearer ', '');

  const decoded = await new Promise<(JwtPayload & { userId: number }) | undefined>((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err !== null || typeof decoded !== 'object') return resolve(undefined);
      resolve(decoded as JwtPayload & { userId: number });
    });
  });

  if (decoded === undefined) {
    res.clearCookie('auth_jwt');
    return;
  }

  const { data: user, error } = await getUserById(decoded.userId);
  if (error !== undefined) return error;

  if (!decoded.iat || (decoded.iat && user.password_updated_at > new Date(decoded.iat * 1000))) {
    return;
  }
  req.user = user;
}
