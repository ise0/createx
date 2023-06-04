import validator from 'validator';
import { ErrorCodes, OperationalError, tryFail } from '@src/shared/operational-error';
import { db } from '@src/shared/db';
import { logger } from '@src/shared/logger';
import { User } from './types';
import { hash } from '@src/shared/password-hash';

type UserForm = { firstName: string; lastName?: string; email: string; password: string };

type ValidationError = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

function validateForm({ email, firstName, password }: UserForm) {
  const validationError: ValidationError = {};

  if (!validator.isEmail(email)) validationError.email = 'provide valid email';
  if (validator.isEmpty(firstName)) validationError.firstName = 'provide valid  first name';
  if (!validator.isStrongPassword(password)) validationError.password = 'provide valid password';

  if (Object.values(validationError).length > 0) return validationError;
}

function normalizeForm(form: UserForm) {
  return {
    ...form,
    lastName: form.lastName || '',
    email: validator.normalizeEmail(form.email),
  };
}

export async function createUser(userForm: UserForm) {
  const validationError = validateForm(userForm);

  if (validationError !== undefined) {
    return { error: new OperationalError({ code: ErrorCodes.badInput, error: validationError }) };
  }

  const normalizedUserForm = normalizeForm(userForm);

  const { data: client, error } = await tryFail(() => db.connect());
  if (error !== undefined) return { error };
  try {
    await client.query('BEGIN');

    let checkUniqueEmailQueryText = `
      select email from users where email = $1 
    `;
    const uniqueEmailRes = await client.query(checkUniqueEmailQueryText, [
      normalizedUserForm.email,
    ]);
    if (uniqueEmailRes.rows.length > 0) {
      return {
        error: new OperationalError({
          code: ErrorCodes.forbidden,
          error: 'This email is already exists',
        }),
      };
    }

    let queryText = ` 
      with user_id as (
        insert into users(first_name, last_name, email, "password") values 
        ($1, $2, $3, $4) 
        returning user_id
      )		 
      select to_json(get_user_by_id((select user_id from user_id)));`;

    const { data: passwordHash, error } = await hash(normalizedUserForm.password);
    if (error !== undefined) return { error };

    const res = await client.query(queryText, [
      normalizedUserForm.firstName,
      normalizedUserForm.lastName,
      normalizedUserForm.email,
      passwordHash,
    ]);

    await client.query('COMMIT');

    return { data: res.rows[0]['to_json'] as User };
  } catch (error) {
    logger.warn('db request fail');;
    await client.query('ROLLBACK').catch(() => {});
    return {
      error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }),
    };
  } finally {
    client.release();
  }
}
