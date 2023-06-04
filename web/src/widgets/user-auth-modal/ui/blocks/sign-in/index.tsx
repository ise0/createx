import { useSignInMutation } from 'features/user-auth';
import { Dispatch, useState } from 'react';
import { ApiErrorCode } from 'shared/api';
import { Btn } from 'shared/ui/btn';
import { FlagBox } from 'shared/ui/flag';
import { Input } from 'shared/ui/input';
import { Modal } from 'shared/ui/modal';
import { Notification } from 'shared/ui/notification';
import Spin from 'shared/ui/spin';
import { validateSignInForm, FormErrors } from 'widgets/user-auth-modal/lib/validate-sign-in-form';
import styles from './styles/sign-in.module.scss';

type Props = { setAction: Dispatch<'signUp'>; closeModal: () => void };

export function SignIn({ setAction, closeModal }: Props) {
  const signIn = useSignInMutation({ onSuccess: () => closeModal() });
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const onSubmit = () => {
    const error = validateSignInForm(form);
    setValidationErrors(error || {});
    if (error === undefined) signIn.mutate(form);
  };

  return (
    <>
      {signIn.isError && signIn.error.code === ApiErrorCode.internalServerError && (
        <Modal alignX="center" alignY="center">
          <Notification
            title="Error"
            text="Oops, something went wrong. Please try again later."
            btnText="OK"
            onClick={() => signIn.reset()}
          />
        </Modal>
      )}
      <div className={styles['sign-in']}>
        {signIn.isLoading && (
          <div className={styles['sign-in__loading']}>
            <Spin className={styles['sign-in__loading-spin']} />
          </div>
        )}
        <button className={styles['sign-in__close']} aria-label="close" onClick={closeModal} />
        <h2 className={styles['sign-in__title']}>Sign in</h2>
        <span className={styles['sign-in__text']}>
          Sign in to your account using email and password provided during registration.
        </span>
        {signIn.isError && signIn.error.code === ApiErrorCode.notValidAuth && (
          <div className={styles['sign-in__error-text']}>
            Wrong email or password, please try again.
          </div>
        )}

        <label className={styles['sign-in__input']}>
          <span className={styles['sign-in__input-label']}>Email</span>
          <Input
            className={styles['sign-in__input-ctrl']}
            type="text"
            typeAttrs={{ autoComplete: 'username' }}
            placeholder="Your working email"
            size="m"
            status={validationErrors.email !== undefined ? 'error' : undefined}
            value={form.email}
            setValue={(value) => setForm((prevState) => ({ ...prevState, email: value }))}
            onCorfim={onSubmit}
          />
          {validationErrors.email !== undefined && (
            <div className={styles['sign-in__input-error-text']}>{validationErrors.email}</div>
          )}
        </label>

        <label className={styles['sign-in__input']}>
          <span className={styles['sign-in__input-label']}>Password</span>
          <Input
            className={styles['sign-in__input-ctrl']}
            type="password"
            typeAttrs={{ autoComplete: 'current-password' }}
            size="m"
            status={validationErrors.password !== undefined ? 'error' : undefined}
            value={form.password}
            setValue={(value) => setForm((prevState) => ({ ...prevState, password: value }))}
            onCorfim={onSubmit}
            predefinedContent={{ showPassword: {} }}
          />
          {validationErrors.password !== undefined && (
            <div className={styles['sign-in__input-error-text']}>{validationErrors.password}</div>
          )}
        </label>

        <FlagBox
          className={styles['sign-in__remember-me']}
          text="Keep me signed in"
          type="checkbox"
          value={form.rememberMe}
          onChange={() =>
            setForm((prevState) => ({ ...prevState, rememberMe: !prevState.rememberMe }))
          }
        />
        <Btn
          className={styles['sign-in__submit']}
          onClick={onSubmit}
          type="submit"
          size="l"
          theme="solid"
          text="Sign in"
        />
        <span className={styles['sign-in__sub-text']}>
          {`Don't have an account?`}
          <button className={styles['sign-in__sign-up']} onClick={() => setAction('signUp')}>
            Sign up
          </button>
        </span>
      </div>
    </>
  );
}
