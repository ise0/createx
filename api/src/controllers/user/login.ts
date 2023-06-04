import { getUserByEmail } from '@src/models/user';
import { ApiError401 } from '@src/shared/api-error';
import { verify } from '@src/shared/password-hash';
import { Response } from 'express';
import { setCookieAuthToken } from './lib/set-cookie-auth-token';

type Params = { email: string; password: string; rememberMe: boolean };

export async function login({ email, password, rememberMe }: Params, res: Response) {
  const { data: user, error } = await getUserByEmail(email);
  if (error !== undefined) return { error };
  if (user === null) {
    return { error: new ApiError401({ message: 'incorrect email or password' }) };
  }
  const { data: correctPassword, error: verifyError } = await verify(password, user.password);
  if (verifyError !== undefined) return verifyError;
  if (correctPassword === false) {
    return { error: new ApiError401({ message: 'incorrect email or password' }) };
  }

  const { data: token, error: tokenError } = await setCookieAuthToken(
    user.user_id,
    res,
    rememberMe
  );
  if (tokenError) return { error: tokenError };

  return { data: { user, token } };
}
