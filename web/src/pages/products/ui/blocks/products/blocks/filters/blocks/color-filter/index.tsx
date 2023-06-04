import cn from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { flagColorGroupTemplate } from 'shared/ui/flag';
import FilterWrapper from '../filter-wrapper';
import styles from './styles/pick-color.module.scss';

type CheckGroupProps<T extends string | number> = {
  value: T[];
  name: string;
  options: { text: string; id: T; color: string }[];
  disabled?: boolean | undefined;
  onChange: Dispatch<SetStateAction<T[]>>;
};

type Props<T extends string | number> = {
  className?: string;
  title: string;
  checkGroupProps: CheckGroupProps<T>;
};

export default function PickColor<T extends string | number>({
  className,
  title,
  checkGroupProps: { options, ...restCheckGroupProps },
}: Props<T>) {
  const [searchText, setSearchText] = useState('');
  const searchTextLowerCase = searchText.toLowerCase();
  return (
    <div className={cn(styles['pick-color'], className)}>
      <FilterWrapper
        className={styles['pick-color__inner']}
        title={title}
        search={{ value: searchText, onChange: setSearchText }}
        contentMaxHeight="172px"
        content={
          <div className={styles['pick-color__list']}>
            {flagColorGroupTemplate({
              size: 'm',
              type: 'checkbox',
              className: styles['pick-color__item'],
              options: options.filter((el) => el.text.toLowerCase().includes(searchTextLowerCase)),
              ...restCheckGroupProps,
            })}
          </div>
        }
      />
    </div>
  );
}
