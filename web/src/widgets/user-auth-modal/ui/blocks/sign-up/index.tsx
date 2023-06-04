import { useSignUpMutation } from 'features/user-auth';
import { Dispatch, useState } from 'react';
import { ApiErrorCode } from 'shared/api';
import { Btn } from 'shared/ui/btn';
import { FlagBox } from 'shared/ui/flag';
import { Input } from 'shared/ui/input';
import { Modal } from 'shared/ui/modal';
import { Notification } from 'shared/ui/notification';
import Spin from 'shared/ui/spin';
import { FormErrors, validateForm } from 'widgets/user-auth-modal/lib/validate-sign-up-form';
import styles from './styles/sign-up.module.scss';

type Props = { setAction: Dispatch<'signIn'>; closeModal: () => void };

export function SignUp({ setAction, closeModal }: Props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });
  const signUp = useSignUpMutation({ onSuccess: () => closeModal() });
  const [validationErrors, setValidationErrors] = useState<FormErrors>();

  const onSubmit = async () => {
    signUp.reset();
    const errors = validateForm(form);
    setValidationErrors(errors);
    if (errors === undefined) signUp.mutate(form);
  };

  let formFieldsErrors: FormErrors = {};
  if (validationErrors) formFieldsErrors = validationErrors;
  if (signUp.isError && signUp.error.code === ApiErrorCode.badRequest) {
    formFieldsErrors = signUp.error.error;
  }

  return (
    <>
      {signUp.isError && signUp.error.code === ApiErrorCode.internalServerError && (
        <Modal alignX="center" alignY="center">
          <Notification
            title="Error"
            text="Oops, something went wrong. Please try again later."
            btnText="OK"
            onClick={() => signUp.reset()}
          />
        </Modal>
      )}

      <div className={styles['sign-up']}>
        {signUp.isLoading && (
          <div className={styles['sign-up__loading']}>
            <Spin className={styles['sign-up__loading-spin']} />
          </div>
        )}
        <button className={styles['sign-up__close']} aria-label="close" onClick={closeModal} />
        <h2 className={styles['sign-up__title']}>Sign up</h2>
        <span className={styles['sign-up__text']}>
          Registration takes less than a minute but gives you full control over your orders.
        </span>

        <label className={styles['sign-up__input']}>
          <span className={styles['sign-up__input-label']}>First name</span>
          <Input
            className={styles['sign-up__input-ctrl']}
            type="text"
            placeholder="Your first name"
            size="m"
            status={formFieldsErrors.firstName !== undefined ? 'error' : undefined}
            value={form.firstName}
            setValue={(value) => setForm((prevState) => ({ ...prevState, firstName: value }))}
            onCorfim={onSubmit}
          />
          {formFieldsErrors.firstName !== undefined && (
            <div className={styles['sign-up__input-error-text']}>{formFieldsErrors.firstName}</div>
          )}
        </label>

        <label className={styles['sign-up__input']}>
          <span className={styles['sign-up__input-label']}>Last name</span>
          <Input
            className={styles['sign-up__input-ctrl']}
            type="text"
            placeholder="Your last name"
            size="m"
            status={formFieldsErrors.lastName !== undefined ? 'error' : undefined}
            value={form.lastName}
            setValue={(value) => setForm((prevState) => ({ ...prevState, lastName: value }))}
            onCorfim={onSubmit}
          />
          {formFieldsErrors.lastName !== undefined && (
            <div className={styles['sign-up__input-error-text']}>{formFieldsErrors.lastName}</div>
          )}
        </label>

        <label className={styles['sign-up__input']}>
          <span className={styles['sign-up__input-label']}>Email</span>
          <Input
            className={styles['sign-up__input-ctrl']}
            type="text"
            placeholder="Your working email"
            size="m"
            status={formFieldsErrors.email !== undefined ? 'error' : undefined}
            value={form.email}
            setValue={(value) => setForm((prevState) => ({ ...prevState, email: value }))}
            onCorfim={onSubmit}
          />
          {formFieldsErrors.email !== undefined && (
            <div className={styles['sign-up__input-error-text']}>{formFieldsErrors.email}</div>
          )}
        </label>

        <label className={styles['sign-up__input']}>
          <span className={styles['sign-up__input-label']}>Password</span>
          <Input
            className={styles['sign-up__input-ctrl']}
            type="password"
            size="m"
            status={formFieldsErrors.password !== undefined ? 'error' : undefined}
            value={form.password}
            setValue={(value) => setForm((prevState) => ({ ...prevState, password: value }))}
            predefinedContent={{ showPassword: {} }}
            onCorfim={onSubmit}
          />
          {formFieldsErrors.password !== undefined && (
            <div className={styles['sign-up__input-error-text']}>{formFieldsErrors.password}</div>
          )}
        </label>

        <label className={styles['sign-up__input']}>
          <span className={styles['sign-up__input-label']}>Confirm password</span>
          <Input
            className={styles['sign-up__input-ctrl']}
            type="password"
            size="m"
            status={formFieldsErrors.confirmPassword !== undefined ? 'error' : undefined}
            value={form.confirmPassword}
            setValue={(value) => setForm((prevState) => ({ ...prevState, confirmPassword: value }))}
            predefinedContent={{ showPassword: {} }}
            onCorfim={onSubmit}
          />
          {formFieldsErrors.confirmPassword !== undefined && (
            <span className={styles['sign-up__input-error-text']}>
              {formFieldsErrors.confirmPassword}
            </span>
          )}
        </label>
        <FlagBox
          className={styles['sign-up__remember-me']}
          text="Remember me"
          onChange={() =>
            setForm((prevState) => ({ ...prevState, rememberMe: !prevState.rememberMe }))
          }
          type="checkbox"
          value={form.rememberMe}
        />
        <Btn
          className={styles['sign-up__submit']}
          type="submit"
          size="l"
          theme="solid"
          text="Sign up"
          onClick={onSubmit}
        />
        <span className={styles['sign-up__sub-text']}>
          Already have account?
          <button className={styles['sign-up__sign-in']} onClick={() => setAction('signIn')}>
            Sign in
          </button>
        </span>
      </div>
    </>
  );
}
