import styles from './styles/active-filter.module.scss';

type Props = { text: string | number; removeFilter: () => void };

export function ActiveFilter({ text, removeFilter }: Props) {
  return (
    <button
      className={styles['active-filter']}
      aria-label={`remove filter term ${text}`}
      onClick={removeFilter}
    >
      {text}
    </button>
  );
}
