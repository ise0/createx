import { createUser as createUserModel } from '@src/models/user';
import { Response } from 'express';
import { setCookieAuthToken } from './lib/set-cookie-auth-token';

type Params = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export async function createUser({ rememberMe, ...form }: Params, res: Response) {
  const { data: user, error: createUserError } = await createUserModel(form);
  if (createUserError !== undefined) {
    return { error: createUserError };
  }

  const { data: token, error: tokenError } = await setCookieAuthToken(
    user.user_id,
    res,
    rememberMe
  );
  if (tokenError) return { error: tokenError };

  return { data: { user, token } };
}
