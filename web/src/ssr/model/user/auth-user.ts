import { getUser } from 'ssr/model/user/get-user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IncomingMessage } from 'http';

export async function authUser(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) {
  const authCookie = req.cookies.auth_jwt;
  
  if (authCookie === undefined) return { data: { status: false as const } };

  const token = authCookie.replace('Bearer ', '');

  const decodedJWT = await new Promise<(JwtPayload & { userId: number }) | undefined>((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err !== null || typeof decoded !== 'object') return resolve(undefined);
      resolve(decoded as JwtPayload & { userId: number });
    });
  });

  if (decodedJWT === undefined) return { data: { status: false as const } };

  const { data: user, error } = await getUser(decodedJWT.userId);
  if (error !== undefined) return { error };

  if (
    !decodedJWT.iat ||
    (decodedJWT.iat && user.passwordUpdatedAt > new Date(decodedJWT.iat * 1000))
  ) {
    return { data: { status: false as const } };
  }

  return { data: { status: true as const, user } };
}
