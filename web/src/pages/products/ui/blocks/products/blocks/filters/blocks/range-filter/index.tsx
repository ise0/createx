import cn from 'classnames';
import { SetStateAction } from 'react';
import { Input } from 'shared/ui/input';
import { RangeSlider } from 'shared/ui/range-slider';
import FilterWrapper from '../filter-wrapper';
import styles from './styles/range-filter.module.scss';

type Props = {
  className?: string;
  title: string;
  onChange: Parameters<typeof RangeSlider>[0]['setValue'];
} & Pick<Parameters<typeof RangeSlider>[0], 'rangeAttrs' | 'value' | 'tooltip'>;

export default function RangeFilter({ className, title, onChange, value, rangeAttrs }: Props) {
  const changeStartValue = (startValue: SetStateAction<number>) => {
    onChange((prevValue) => {
      return {
        ...prevValue,
        start: typeof startValue !== 'function' ? startValue : startValue(prevValue.start),
      };
    });
  };

  const changeEndValue = (endValue: SetStateAction<number>) => {
    onChange((prevValue) => {
      return {
        ...prevValue,
        end: typeof endValue !== 'function' ? endValue : endValue(prevValue.start),
      };
    });
  };

  return (
    <div className={cn(styles['range-filter'], className)}>
      <FilterWrapper
        title={title}
        content={
          <div className={styles['range-filter__list']}>
            <RangeSlider
              className={styles['range-filter__slider']}
              setValue={onChange}
              value={value}
              rangeAttrs={rangeAttrs}
              tooltip
            />
            <div className={styles['range-filter__inputs']}>
              <Input
                className={styles['range-filter__start-input']}
                size="s"
                ariaLabel="start range"
                setValue={changeStartValue}
                type="number"
                value={value.start}
              />
              <div className={styles['range-filter__sep']} />
              <Input
                className={styles['range-filter__end-input']}
                size="s"
                ariaLabel="start range"
                setValue={changeEndValue}
                type="number"
                value={value.end}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
