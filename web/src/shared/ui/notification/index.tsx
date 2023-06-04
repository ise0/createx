import styles from './styles/notification.module.scss';

type Props = { title: string; text: string; btnText: string; onClick: () => void };

export function Notification({ title, text, btnText, onClick }: Props) {
  return (
    <div className={styles['notification']}>
      <h3 className={styles['notification__title']}>{title}</h3>
      <p className={styles['notification__text']}>{text}</p>
      <button className={styles['notification__btn']} onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
}
