import cn from 'classnames';
import Link from 'next/link';
import styles from './styles/breadcrumbs.module.scss';

type Props = { className?: string; value: { text: string; link?: string }[] };

export default function Breadcrumbs({ className, value }: Props) {
  return (
    <ol className={cn(styles['breadcrumbs'], className)}>
      <li className={styles['breadcrumbs__home-item']}>
        <Link className={styles['breadcrumbs__home-link']} href="/" aria-label="Home" />
      </li>
      {value.map(({ text, link }, i) => (
        <li
          className={cn(styles['breadcrumbs__item'], {
            [styles['breadcrumbs__item_last']]: i + 1 === value.length,
          })}
          key={text}
        >
          {link === undefined ? (
            text
          ) : (
            <Link className={styles['breadcrumbs__link']} href={link}>
              {text}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
