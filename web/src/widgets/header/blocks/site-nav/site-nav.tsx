import { useAppSelector } from 'app-root/store';
import cn from 'classnames';
import { useGetUserQuery } from 'features/use-get-user-query';
import { useLogoutMutation } from 'features/user-auth/use-logout-mutation';
import styles from './styles/site-nav.module.scss';

type Props = { className?: string; onSignInClick: () => void; onSignUpClick: () => void };

export default function SiteNav({ className, onSignInClick, onSignUpClick }: Props) {
  const isAuthenticated = useAppSelector((state) => state.userAuth.isAuthenticated);
  const { data: user } = useGetUserQuery({ enabled: isAuthenticated });
  const logout = useLogoutMutation({});

  return (
    <div className={cn(styles['site-nav'], className)}>
      <div className={styles['site-nav__inner']}>
        <span className={styles['site-nav__contact-number']}>
          Available 24/7 at
          <span className={styles['site-nav__phone-number']}>{' (405) 555-0128'}</span>
        </span>
        <div className={styles['site-nav__user-profile']}>
          {user !== undefined ? (
            <>
              <span className={styles['site-nav__user-name']}>{user.firstName}</span>
              <button
                className={styles['site-nav__user-profile-btn']}
                onClick={() => logout.mutate()}
              >
                logout
              </button>
            </>
          ) : (
            <>
              <button className={styles['site-nav__user-profile-btn']} onClick={onSignInClick}>
                Log in
              </button>
              <span className={styles['site-nav__sep']}> / </span>
              <button className={styles['site-nav__user-profile-btn']} onClick={onSignUpClick}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
