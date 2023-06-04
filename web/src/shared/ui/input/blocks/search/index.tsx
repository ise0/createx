import styles from './styles/search.module.scss';

type Props = {
  onClick: () => void;
};

export function Search({ onClick }: Props) {
  return <button className={styles['search']} aria-label="search" onClick={() => onClick()} />;
}
