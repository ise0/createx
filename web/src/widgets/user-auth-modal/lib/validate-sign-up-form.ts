import validator from 'validator';

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function validateForm(form: Form) {
  const errors: FormErrors = {};

  if (validator.isEmpty(form.firstName)) errors.firstName = 'Enter first name';
  if (validator.isEmpty(form.email)) errors.email = 'Enter email';
  if (validator.isEmpty(form.password)) errors.password = 'Enter password';
  if (validator.isEmpty(form.confirmPassword)) errors.confirmPassword = 'Enter confirm password';

  if (errors.email === undefined && !validator.isEmail(form.email)) {
    errors.email = 'Enter valid email';
  }
  if (errors.password === undefined && form.password !== form.confirmPassword) {
    errors.password = 'Password & Confirm Password do not match';
    errors.confirmPassword = 'Password & Confirm Password do not match';
  }
  if (errors.password === undefined && !validator.isStrongPassword(form.password)) {
    errors.password =
      'Password must contain at least 8 characters and including at least 1 number, 1 uppercase letter, 1 symbol.';
  }

  if (Object.values(errors).length > 0) return errors;
}
