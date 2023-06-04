import cn from 'classnames';
import { ReactNode, useState } from 'react';
import styles from './styles/rating.module.scss';

type Props = {
  className?: string;
  rate: number;
  outOf: number;
  input?: { ariaLabel?: string; onChange: (value: number) => void };
};

export function Rating({ className, outOf, rate, input }: Props) {
  const [checkedStar, setCheckedStar] = useState(0);
  const floorRate = Math.floor(rate);
  const halfFilledStar = rate !== floorRate ? floorRate + 1 : -1;

  const stars: ReactNode[] = [];
  for (let i = 1; i <= outOf; i += 1) {
    stars.push(
      <span
        key={i}
        className={cn(styles['rating__star'], {
          [styles['rating__star_fill_full']]: i <= floorRate && !checkedStar,
          [styles['rating__star_fill_half']]: i === halfFilledStar && !checkedStar,
          [styles['rating__star_checked']]: i <= checkedStar,
        })}
      />
    );
  }

  return (
    <div className={cn(styles['rating'], className)}>
      {input && (
        <input
          className={styles['rating__input']}
          type="range"
          aria-label={input.ariaLabel}
          min={1}
          max={outOf}
          onChange={(evt) => {
            setCheckedStar(+evt.target.value);
            input.onChange(+evt.target.value);
          }}
          onBlur={() => setCheckedStar(0)}
        />
      )}
      {stars}
    </div>
  );
}
