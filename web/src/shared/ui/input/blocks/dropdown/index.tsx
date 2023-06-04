import styles from './styles/dropdown.module.scss';
import cn from 'classnames';

type Props = {
  onClick: () => void;
  value: boolean;
  ariaLabel?: string;
};

export function Dropdown({ onClick, value, ariaLabel }: Props) {
  return (
    <button
      className={cn(styles['dropdown'], {
        [styles['dropdown_expanded']]: value,
      })}
      aria-expanded={value}
      aria-label={ariaLabel || 'menu'}
      onClick={onClick}
    />
  );
}
