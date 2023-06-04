import { Dispatch, SetStateAction } from 'react';
import styles from './styles/show-password.module.scss';

type Props = {
  setType: Dispatch<SetStateAction<string>>;
};

export function ShowPassword({ setType }: Props) {
  return (
    <button
      className={styles['show-password']}
      onClick={() => setType((prevValue) => (prevValue === 'text' ? 'password' : 'text'))}
      aria-label="show password"
    />
  );
}
