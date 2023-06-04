import validator from 'validator';

type Form = {
  email: string;
  password: string;
};

export type FormErrors = {
  email?: string;
  password?: string;
};

export function validateSignInForm(form: Form) {
  const errors: FormErrors = {};

  if (validator.isEmpty(form.email)) errors.email = 'Enter email';
  if (validator.isEmpty(form.password)) errors.password = 'Enter password';

  if (errors.email === undefined && !validator.isEmail(form.email)) {
    errors.email = 'Enter valid email';
  }

  if (Object.values(errors).length > 0) return errors;
}
